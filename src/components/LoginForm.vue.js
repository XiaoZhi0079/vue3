import { ref } from 'vue';
import { Lock } from '@element-plus/icons-vue';
const password = ref('');
const loading = ref(false);
const emit = defineEmits(['login']);
const handleLogin = async () => {
    if (!password.value)
        return;
    loading.value = true;
    // In a real app, you might verify the password against the server here
    // For now, we just pass it up to be used as the API key/secret
    emit('login', password.value);
    loading.value = false;
};
const __VLS_ctx = {
    ...{},
    ...{},
    ...{},
    ...{},
    ...{},
};
let ___VLS_components;
let ___VLS_directives;
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "login-container" },
});
/** @type {__VLS_StyleScopedClasses['login-container']} */ ;
const __VLS_0 = {}.ElCard;
/** @type {[typeof ___VLS_components.ElCard, typeof ___VLS_components.elCard, typeof ___VLS_components.ElCard, typeof ___VLS_components.elCard, ]} */ ;
// @ts-ignore
ElCard;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
    ...{ class: "login-card" },
}));
const __VLS_2 = __VLS_1({
    ...{ class: "login-card" },
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
/** @type {__VLS_StyleScopedClasses['login-card']} */ ;
const { default: __VLS_5 } = __VLS_3.slots;
{
    const { header: __VLS_6 } = __VLS_3.slots;
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "card-header" },
    });
    /** @type {__VLS_StyleScopedClasses['card-header']} */ ;
    __VLS_asFunctionalElement(__VLS_intrinsics.span, __VLS_intrinsics.span)({});
}
const __VLS_7 = {}.ElForm;
/** @type {[typeof ___VLS_components.ElForm, typeof ___VLS_components.elForm, typeof ___VLS_components.ElForm, typeof ___VLS_components.elForm, ]} */ ;
// @ts-ignore
ElForm;
// @ts-ignore
const __VLS_8 = __VLS_asFunctionalComponent(__VLS_7, new __VLS_7({
    ...{ 'onSubmit': {} },
}));
const __VLS_9 = __VLS_8({
    ...{ 'onSubmit': {} },
}, ...__VLS_functionalComponentArgsRest(__VLS_8));
let __VLS_12;
const __VLS_13 = ({ submit: {} },
    { onSubmit: (__VLS_ctx.handleLogin) });
const { default: __VLS_14 } = __VLS_10.slots;
const __VLS_15 = {}.ElFormItem;
/** @type {[typeof ___VLS_components.ElFormItem, typeof ___VLS_components.elFormItem, typeof ___VLS_components.ElFormItem, typeof ___VLS_components.elFormItem, ]} */ ;
// @ts-ignore
ElFormItem;
// @ts-ignore
const __VLS_16 = __VLS_asFunctionalComponent(__VLS_15, new __VLS_15({}));
const __VLS_17 = __VLS_16({}, ...__VLS_functionalComponentArgsRest(__VLS_16));
const { default: __VLS_20 } = __VLS_18.slots;
const __VLS_21 = {}.ElInput;
/** @type {[typeof ___VLS_components.ElInput, typeof ___VLS_components.elInput, ]} */ ;
// @ts-ignore
ElInput;
// @ts-ignore
const __VLS_22 = __VLS_asFunctionalComponent(__VLS_21, new __VLS_21({
    ...{ 'onKeyup': {} },
    modelValue: (__VLS_ctx.password),
    type: "password",
    placeholder: "Enter Master Password",
    prefixIcon: (__VLS_ctx.Lock),
    showPassword: true,
}));
const __VLS_23 = __VLS_22({
    ...{ 'onKeyup': {} },
    modelValue: (__VLS_ctx.password),
    type: "password",
    placeholder: "Enter Master Password",
    prefixIcon: (__VLS_ctx.Lock),
    showPassword: true,
}, ...__VLS_functionalComponentArgsRest(__VLS_22));
let __VLS_26;
const __VLS_27 = ({ keyup: {} },
    { onKeyup: (__VLS_ctx.handleLogin) });
// @ts-ignore
[handleLogin, handleLogin, password, Lock,];
var __VLS_24;
var __VLS_25;
// @ts-ignore
[];
var __VLS_18;
const __VLS_29 = {}.ElFormItem;
/** @type {[typeof ___VLS_components.ElFormItem, typeof ___VLS_components.elFormItem, typeof ___VLS_components.ElFormItem, typeof ___VLS_components.elFormItem, ]} */ ;
// @ts-ignore
ElFormItem;
// @ts-ignore
const __VLS_30 = __VLS_asFunctionalComponent(__VLS_29, new __VLS_29({}));
const __VLS_31 = __VLS_30({}, ...__VLS_functionalComponentArgsRest(__VLS_30));
const { default: __VLS_34 } = __VLS_32.slots;
const __VLS_35 = {}.ElButton;
/** @type {[typeof ___VLS_components.ElButton, typeof ___VLS_components.elButton, typeof ___VLS_components.ElButton, typeof ___VLS_components.elButton, ]} */ ;
// @ts-ignore
ElButton;
// @ts-ignore
const __VLS_36 = __VLS_asFunctionalComponent(__VLS_35, new __VLS_35({
    ...{ 'onClick': {} },
    type: "primary",
    ...{ class: "w-100" },
    loading: (__VLS_ctx.loading),
}));
const __VLS_37 = __VLS_36({
    ...{ 'onClick': {} },
    type: "primary",
    ...{ class: "w-100" },
    loading: (__VLS_ctx.loading),
}, ...__VLS_functionalComponentArgsRest(__VLS_36));
let __VLS_40;
const __VLS_41 = ({ click: {} },
    { onClick: (__VLS_ctx.handleLogin) });
/** @type {__VLS_StyleScopedClasses['w-100']} */ ;
const { default: __VLS_42 } = __VLS_38.slots;
// @ts-ignore
[handleLogin, loading,];
var __VLS_38;
var __VLS_39;
// @ts-ignore
[];
var __VLS_32;
// @ts-ignore
[];
var __VLS_10;
var __VLS_11;
// @ts-ignore
[];
var __VLS_3;
// @ts-ignore
[];
const __VLS_export = (await import('vue')).defineComponent({
    emits: {},
});
export default {};
