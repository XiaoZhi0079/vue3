export async function onRequest(context) {
  const { request, env } = context;
  
  // 1. Authentication Check
  const authHeader = request.headers.get('Authorization');
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return new Response(JSON.stringify({ success: false, message: 'Unauthorized' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  const token = authHeader.split(' ')[1];
  
  // 2. KV Binding Check
  if (!env.PASSWORD_KV) {
    return new Response(JSON.stringify({ success: false, message: 'Server misconfigured: PASSWORD_KV not bound' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  // Verify session
  const username = await env.PASSWORD_KV.get(`session:${token}`);
  if (!username) {
    return new Response(JSON.stringify({ success: false, message: 'Session expired or invalid' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  const KEY = `data:${username}`;

  try {
    // 3. Handle Methods
    if (request.method === 'GET') {
      const data = await env.PASSWORD_KV.get(KEY, { type: 'json' });
      return new Response(JSON.stringify({ success: true, data: data || [] }), {
        headers: { 'Content-Type': 'application/json' }
      });
    }

    if (request.method === 'POST') {
      const newItem = await request.json();
      // Basic validation
      if (!newItem.platform || !newItem.account || !newItem.password) {
        return new Response(JSON.stringify({ success: false, message: 'Missing fields' }), { status: 400 });
      }

      const list = (await env.PASSWORD_KV.get(KEY, { type: 'json' })) || [];
      
      const item = {
        ...newItem,
        id: crypto.randomUUID(),
        updatedAt: Date.now()
      };
      
      list.push(item);
      await env.PASSWORD_KV.put(KEY, JSON.stringify(list));
      
      return new Response(JSON.stringify({ success: true, data: item }), {
        headers: { 'Content-Type': 'application/json' }
      });
    }

    if (request.method === 'PUT') {
      const updateItem = await request.json();
      if (!updateItem.id) {
        return new Response(JSON.stringify({ success: false, message: 'Missing ID' }), { status: 400 });
      }

      const list = (await env.PASSWORD_KV.get(KEY, { type: 'json' })) || [];
      const index = list.findIndex(i => i.id === updateItem.id);
      
      if (index === -1) {
        return new Response(JSON.stringify({ success: false, message: 'Item not found' }), { status: 404 });
      }

      list[index] = { ...list[index], ...updateItem, updatedAt: Date.now() };
      await env.PASSWORD_KV.put(KEY, JSON.stringify(list));

      return new Response(JSON.stringify({ success: true }), {
        headers: { 'Content-Type': 'application/json' }
      });
    }

    if (request.method === 'DELETE') {
      const { id } = await request.json();
      if (!id) {
        return new Response(JSON.stringify({ success: false, message: 'Missing ID' }), { status: 400 });
      }

      let list = (await env.PASSWORD_KV.get(KEY, { type: 'json' })) || [];
      const initialLength = list.length;
      list = list.filter(i => i.id !== id);
      
      if (list.length === initialLength) {
        return new Response(JSON.stringify({ success: false, message: 'Item not found' }), { status: 404 });
      }

      await env.PASSWORD_KV.put(KEY, JSON.stringify(list));

      return new Response(JSON.stringify({ success: true }), {
        headers: { 'Content-Type': 'application/json' }
      });
    }

    return new Response(JSON.stringify({ success: false, message: 'Method not allowed' }), { status: 405 });

  } catch (err) {
    return new Response(JSON.stringify({ success: false, message: err.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
