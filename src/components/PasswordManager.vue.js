import { ref, onMounted, reactive } from 'vue';
import { ElMessage, ElMessageBox } from 'element-plus';
import { Plus, Edit, Delete, CopyDocument, Refresh } from '@element-plus/icons-vue';
import axios from 'axios';
const props = defineProps();
const items = ref([]);
const loading = ref(false);
const dialogVisible = ref(false);
const dialogType = ref('add');
const formRef = ref();
const form = reactive({
    platform: '',
    account: '',
    password: '',
    remark: ''
});
const currentId = ref('');
const rules = reactive({
    platform: [{ required: true, message: 'Please input platform name', trigger: 'blur' }],
    account: [{ required: true, message: 'Please input account', trigger: 'blur' }],
    password: [{ required: true, message: 'Please input password', trigger: 'blur' }]
});
const api = axios.create({
    baseURL: '/api',
    headers: {
        'Authorization': `Bearer ${props.authKey}`
    }
});
const fetchData = async () => {
    loading.value = true;
    try {
        const res = await api.get('/passwords');
        if (res.data.success && res.data.data) {
            items.value = res.data.data;
        }
        else {
            ElMessage.error(res.data.message || 'Failed to fetch data');
        }
    }
    catch (error) {
        ElMessage.error('Network error or unauthorized');
    }
    finally {
        loading.value = false;
    }
};
const handleAdd = () => {
    dialogType.value = 'add';
    currentId.value = '';
    form.platform = '';
    form.account = '';
    form.password = '';
    form.remark = '';
    dialogVisible.value = true;
};
const handleEdit = (row) => {
    dialogType.value = 'edit';
    currentId.value = row.id;
    form.platform = row.platform;
    form.account = row.account;
    form.password = row.password;
    form.remark = row.remark;
    dialogVisible.value = true;
};
const handleDelete = (row) => {
    ElMessageBox.confirm('Are you sure you want to delete this item?', 'Warning', {
        confirmButtonText: 'Delete',
        cancelButtonText: 'Cancel',
        type: 'warning',
    }).then(async () => {
        try {
            const res = await api.delete('/passwords', { data: { id: row.id } });
            if (res.data.success) {
                ElMessage.success('Deleted successfully');
                fetchData();
            }
            else {
                ElMessage.error(res.data.message || 'Delete failed');
            }
        }
        catch (error) {
            ElMessage.error('Error deleting item');
        }
    });
};
const submitForm = async (formEl) => {
    if (!formEl)
        return;
    await formEl.validate(async (valid, fields) => {
        if (valid) {
            try {
                const payload = { ...form, id: currentId.value };
                const method = dialogType.value === 'add' ? 'post' : 'put';
                const res = await api[method]('/passwords', payload);
                if (res.data.success) {
                    ElMessage.success(dialogType.value === 'add' ? 'Added successfully' : 'Updated successfully');
                    dialogVisible.value = false;
                    fetchData();
                }
                else {
                    ElMessage.error(res.data.message || 'Operation failed');
                }
            }
            catch (error) {
                ElMessage.error('Error submitting form');
            }
        }
    });
};
const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(() => {
        ElMessage.success('Password copied to clipboard');
    }).catch(() => {
        ElMessage.error('Failed to copy');
    });
};
onMounted(() => {
    fetchData();
});
const __VLS_ctx = {
    ...{},
    ...{},
    ...{},
    ...{},
};
let ___VLS_components;
let ___VLS_directives;
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "manager-container" },
});
/** @type {__VLS_StyleScopedClasses['manager-container']} */ ;
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "header" },
});
/** @type {__VLS_StyleScopedClasses['header']} */ ;
__VLS_asFunctionalElement(__VLS_intrinsics.h2, __VLS_intrinsics.h2)({});
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "actions" },
});
/** @type {__VLS_StyleScopedClasses['actions']} */ ;
const __VLS_0 = {}.ElButton;
/** @type {[typeof ___VLS_components.ElButton, typeof ___VLS_components.elButton, ]} */ ;
// @ts-ignore
ElButton;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
    ...{ 'onClick': {} },
    icon: (__VLS_ctx.Refresh),
    circle: true,
}));
const __VLS_2 = __VLS_1({
    ...{ 'onClick': {} },
    icon: (__VLS_ctx.Refresh),
    circle: true,
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
let __VLS_5;
const __VLS_6 = ({ click: {} },
    { onClick: (__VLS_ctx.fetchData) });
// @ts-ignore
[Refresh, fetchData,];
var __VLS_3;
var __VLS_4;
const __VLS_8 = {}.ElButton;
/** @type {[typeof ___VLS_components.ElButton, typeof ___VLS_components.elButton, typeof ___VLS_components.ElButton, typeof ___VLS_components.elButton, ]} */ ;
// @ts-ignore
ElButton;
// @ts-ignore
const __VLS_9 = __VLS_asFunctionalComponent(__VLS_8, new __VLS_8({
    ...{ 'onClick': {} },
    type: "primary",
    icon: (__VLS_ctx.Plus),
}));
const __VLS_10 = __VLS_9({
    ...{ 'onClick': {} },
    type: "primary",
    icon: (__VLS_ctx.Plus),
}, ...__VLS_functionalComponentArgsRest(__VLS_9));
let __VLS_13;
const __VLS_14 = ({ click: {} },
    { onClick: (__VLS_ctx.handleAdd) });
const { default: __VLS_15 } = __VLS_11.slots;
// @ts-ignore
[Plus, handleAdd,];
var __VLS_11;
var __VLS_12;
const __VLS_16 = {}.ElTable;
/** @type {[typeof ___VLS_components.ElTable, typeof ___VLS_components.elTable, typeof ___VLS_components.ElTable, typeof ___VLS_components.elTable, ]} */ ;
// @ts-ignore
ElTable;
// @ts-ignore
const __VLS_17 = __VLS_asFunctionalComponent(__VLS_16, new __VLS_16({
    data: (__VLS_ctx.items),
    ...{ style: {} },
    stripe: true,
    border: true,
}));
const __VLS_18 = __VLS_17({
    data: (__VLS_ctx.items),
    ...{ style: {} },
    stripe: true,
    border: true,
}, ...__VLS_functionalComponentArgsRest(__VLS_17));
__VLS_asFunctionalDirective(___VLS_directives.vLoading)(null, { ...__VLS_directiveBindingRestFields, value: (__VLS_ctx.loading) }, null, null);
const { default: __VLS_21 } = __VLS_19.slots;
const __VLS_22 = {}.ElTableColumn;
/** @type {[typeof ___VLS_components.ElTableColumn, typeof ___VLS_components.elTableColumn, ]} */ ;
// @ts-ignore
ElTableColumn;
// @ts-ignore
const __VLS_23 = __VLS_asFunctionalComponent(__VLS_22, new __VLS_22({
    prop: "platform",
    label: "Platform",
    sortable: true,
}));
const __VLS_24 = __VLS_23({
    prop: "platform",
    label: "Platform",
    sortable: true,
}, ...__VLS_functionalComponentArgsRest(__VLS_23));
// @ts-ignore
[items, vLoading, loading,];
const __VLS_28 = {}.ElTableColumn;
/** @type {[typeof ___VLS_components.ElTableColumn, typeof ___VLS_components.elTableColumn, ]} */ ;
// @ts-ignore
ElTableColumn;
// @ts-ignore
const __VLS_29 = __VLS_asFunctionalComponent(__VLS_28, new __VLS_28({
    prop: "account",
    label: "Account",
}));
const __VLS_30 = __VLS_29({
    prop: "account",
    label: "Account",
}, ...__VLS_functionalComponentArgsRest(__VLS_29));
// @ts-ignore
[];
const __VLS_34 = {}.ElTableColumn;
/** @type {[typeof ___VLS_components.ElTableColumn, typeof ___VLS_components.elTableColumn, typeof ___VLS_components.ElTableColumn, typeof ___VLS_components.elTableColumn, ]} */ ;
// @ts-ignore
ElTableColumn;
// @ts-ignore
const __VLS_35 = __VLS_asFunctionalComponent(__VLS_34, new __VLS_34({
    label: "Password",
}));
const __VLS_36 = __VLS_35({
    label: "Password",
}, ...__VLS_functionalComponentArgsRest(__VLS_35));
const { default: __VLS_39 } = __VLS_37.slots;
{
    const { default: __VLS_40 } = __VLS_37.slots;
    const [scope] = __VLS_getSlotParameters(__VLS_40);
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "password-cell" },
    });
    /** @type {__VLS_StyleScopedClasses['password-cell']} */ ;
    __VLS_asFunctionalElement(__VLS_intrinsics.span, __VLS_intrinsics.span)({});
    const __VLS_41 = {}.ElButton;
    /** @type {[typeof ___VLS_components.ElButton, typeof ___VLS_components.elButton, ]} */ ;
    // @ts-ignore
    ElButton;
    // @ts-ignore
    const __VLS_42 = __VLS_asFunctionalComponent(__VLS_41, new __VLS_41({
        ...{ 'onClick': {} },
        link: true,
        type: "primary",
        icon: (__VLS_ctx.CopyDocument),
    }));
    const __VLS_43 = __VLS_42({
        ...{ 'onClick': {} },
        link: true,
        type: "primary",
        icon: (__VLS_ctx.CopyDocument),
    }, ...__VLS_functionalComponentArgsRest(__VLS_42));
    let __VLS_46;
    const __VLS_47 = ({ click: {} },
        { onClick: (...[$event]) => {
                __VLS_ctx.copyToClipboard(scope.row.password);
                // @ts-ignore
                [CopyDocument, copyToClipboard,];
            } });
    // @ts-ignore
    [];
    var __VLS_44;
    var __VLS_45;
    // @ts-ignore
    [];
}
// @ts-ignore
[];
var __VLS_37;
const __VLS_49 = {}.ElTableColumn;
/** @type {[typeof ___VLS_components.ElTableColumn, typeof ___VLS_components.elTableColumn, ]} */ ;
// @ts-ignore
ElTableColumn;
// @ts-ignore
const __VLS_50 = __VLS_asFunctionalComponent(__VLS_49, new __VLS_49({
    prop: "remark",
    label: "Remark",
    showOverflowTooltip: true,
}));
const __VLS_51 = __VLS_50({
    prop: "remark",
    label: "Remark",
    showOverflowTooltip: true,
}, ...__VLS_functionalComponentArgsRest(__VLS_50));
// @ts-ignore
[];
const __VLS_55 = {}.ElTableColumn;
/** @type {[typeof ___VLS_components.ElTableColumn, typeof ___VLS_components.elTableColumn, typeof ___VLS_components.ElTableColumn, typeof ___VLS_components.elTableColumn, ]} */ ;
// @ts-ignore
ElTableColumn;
// @ts-ignore
const __VLS_56 = __VLS_asFunctionalComponent(__VLS_55, new __VLS_55({
    label: "Actions",
    width: "150",
    fixed: "right",
}));
const __VLS_57 = __VLS_56({
    label: "Actions",
    width: "150",
    fixed: "right",
}, ...__VLS_functionalComponentArgsRest(__VLS_56));
const { default: __VLS_60 } = __VLS_58.slots;
{
    const { default: __VLS_61 } = __VLS_58.slots;
    const [scope] = __VLS_getSlotParameters(__VLS_61);
    const __VLS_62 = {}.ElButton;
    /** @type {[typeof ___VLS_components.ElButton, typeof ___VLS_components.elButton, typeof ___VLS_components.ElButton, typeof ___VLS_components.elButton, ]} */ ;
    // @ts-ignore
    ElButton;
    // @ts-ignore
    const __VLS_63 = __VLS_asFunctionalComponent(__VLS_62, new __VLS_62({
        ...{ 'onClick': {} },
        link: true,
        type: "primary",
        icon: (__VLS_ctx.Edit),
    }));
    const __VLS_64 = __VLS_63({
        ...{ 'onClick': {} },
        link: true,
        type: "primary",
        icon: (__VLS_ctx.Edit),
    }, ...__VLS_functionalComponentArgsRest(__VLS_63));
    let __VLS_67;
    const __VLS_68 = ({ click: {} },
        { onClick: (...[$event]) => {
                __VLS_ctx.handleEdit(scope.row);
                // @ts-ignore
                [Edit, handleEdit,];
            } });
    const { default: __VLS_69 } = __VLS_65.slots;
    // @ts-ignore
    [];
    var __VLS_65;
    var __VLS_66;
    const __VLS_70 = {}.ElButton;
    /** @type {[typeof ___VLS_components.ElButton, typeof ___VLS_components.elButton, typeof ___VLS_components.ElButton, typeof ___VLS_components.elButton, ]} */ ;
    // @ts-ignore
    ElButton;
    // @ts-ignore
    const __VLS_71 = __VLS_asFunctionalComponent(__VLS_70, new __VLS_70({
        ...{ 'onClick': {} },
        link: true,
        type: "danger",
        icon: (__VLS_ctx.Delete),
    }));
    const __VLS_72 = __VLS_71({
        ...{ 'onClick': {} },
        link: true,
        type: "danger",
        icon: (__VLS_ctx.Delete),
    }, ...__VLS_functionalComponentArgsRest(__VLS_71));
    let __VLS_75;
    const __VLS_76 = ({ click: {} },
        { onClick: (...[$event]) => {
                __VLS_ctx.handleDelete(scope.row);
                // @ts-ignore
                [Delete, handleDelete,];
            } });
    const { default: __VLS_77 } = __VLS_73.slots;
    // @ts-ignore
    [];
    var __VLS_73;
    var __VLS_74;
    // @ts-ignore
    [];
}
// @ts-ignore
[];
var __VLS_58;
// @ts-ignore
[];
var __VLS_19;
const __VLS_78 = {}.ElDialog;
/** @type {[typeof ___VLS_components.ElDialog, typeof ___VLS_components.elDialog, typeof ___VLS_components.ElDialog, typeof ___VLS_components.elDialog, ]} */ ;
// @ts-ignore
ElDialog;
// @ts-ignore
const __VLS_79 = __VLS_asFunctionalComponent(__VLS_78, new __VLS_78({
    modelValue: (__VLS_ctx.dialogVisible),
    title: (__VLS_ctx.dialogType === 'add' ? 'Add Password' : 'Edit Password'),
    width: "500px",
}));
const __VLS_80 = __VLS_79({
    modelValue: (__VLS_ctx.dialogVisible),
    title: (__VLS_ctx.dialogType === 'add' ? 'Add Password' : 'Edit Password'),
    width: "500px",
}, ...__VLS_functionalComponentArgsRest(__VLS_79));
const { default: __VLS_83 } = __VLS_81.slots;
const __VLS_84 = {}.ElForm;
/** @type {[typeof ___VLS_components.ElForm, typeof ___VLS_components.elForm, typeof ___VLS_components.ElForm, typeof ___VLS_components.elForm, ]} */ ;
// @ts-ignore
ElForm;
// @ts-ignore
const __VLS_85 = __VLS_asFunctionalComponent(__VLS_84, new __VLS_84({
    ref: "formRef",
    model: (__VLS_ctx.form),
    rules: (__VLS_ctx.rules),
    labelWidth: "80px",
}));
const __VLS_86 = __VLS_85({
    ref: "formRef",
    model: (__VLS_ctx.form),
    rules: (__VLS_ctx.rules),
    labelWidth: "80px",
}, ...__VLS_functionalComponentArgsRest(__VLS_85));
var __VLS_89 = {};
const { default: __VLS_91 } = __VLS_87.slots;
const __VLS_92 = {}.ElFormItem;
/** @type {[typeof ___VLS_components.ElFormItem, typeof ___VLS_components.elFormItem, typeof ___VLS_components.ElFormItem, typeof ___VLS_components.elFormItem, ]} */ ;
// @ts-ignore
ElFormItem;
// @ts-ignore
const __VLS_93 = __VLS_asFunctionalComponent(__VLS_92, new __VLS_92({
    label: "Platform",
    prop: "platform",
}));
const __VLS_94 = __VLS_93({
    label: "Platform",
    prop: "platform",
}, ...__VLS_functionalComponentArgsRest(__VLS_93));
const { default: __VLS_97 } = __VLS_95.slots;
const __VLS_98 = {}.ElInput;
/** @type {[typeof ___VLS_components.ElInput, typeof ___VLS_components.elInput, ]} */ ;
// @ts-ignore
ElInput;
// @ts-ignore
const __VLS_99 = __VLS_asFunctionalComponent(__VLS_98, new __VLS_98({
    modelValue: (__VLS_ctx.form.platform),
    placeholder: "e.g. Google, GitHub",
}));
const __VLS_100 = __VLS_99({
    modelValue: (__VLS_ctx.form.platform),
    placeholder: "e.g. Google, GitHub",
}, ...__VLS_functionalComponentArgsRest(__VLS_99));
// @ts-ignore
[dialogVisible, dialogType, form, form, rules,];
// @ts-ignore
[];
var __VLS_95;
const __VLS_104 = {}.ElFormItem;
/** @type {[typeof ___VLS_components.ElFormItem, typeof ___VLS_components.elFormItem, typeof ___VLS_components.ElFormItem, typeof ___VLS_components.elFormItem, ]} */ ;
// @ts-ignore
ElFormItem;
// @ts-ignore
const __VLS_105 = __VLS_asFunctionalComponent(__VLS_104, new __VLS_104({
    label: "Account",
    prop: "account",
}));
const __VLS_106 = __VLS_105({
    label: "Account",
    prop: "account",
}, ...__VLS_functionalComponentArgsRest(__VLS_105));
const { default: __VLS_109 } = __VLS_107.slots;
const __VLS_110 = {}.ElInput;
/** @type {[typeof ___VLS_components.ElInput, typeof ___VLS_components.elInput, ]} */ ;
// @ts-ignore
ElInput;
// @ts-ignore
const __VLS_111 = __VLS_asFunctionalComponent(__VLS_110, new __VLS_110({
    modelValue: (__VLS_ctx.form.account),
    placeholder: "Username or Email",
}));
const __VLS_112 = __VLS_111({
    modelValue: (__VLS_ctx.form.account),
    placeholder: "Username or Email",
}, ...__VLS_functionalComponentArgsRest(__VLS_111));
// @ts-ignore
[form,];
// @ts-ignore
[];
var __VLS_107;
const __VLS_116 = {}.ElFormItem;
/** @type {[typeof ___VLS_components.ElFormItem, typeof ___VLS_components.elFormItem, typeof ___VLS_components.ElFormItem, typeof ___VLS_components.elFormItem, ]} */ ;
// @ts-ignore
ElFormItem;
// @ts-ignore
const __VLS_117 = __VLS_asFunctionalComponent(__VLS_116, new __VLS_116({
    label: "Password",
    prop: "password",
}));
const __VLS_118 = __VLS_117({
    label: "Password",
    prop: "password",
}, ...__VLS_functionalComponentArgsRest(__VLS_117));
const { default: __VLS_121 } = __VLS_119.slots;
const __VLS_122 = {}.ElInput;
/** @type {[typeof ___VLS_components.ElInput, typeof ___VLS_components.elInput, ]} */ ;
// @ts-ignore
ElInput;
// @ts-ignore
const __VLS_123 = __VLS_asFunctionalComponent(__VLS_122, new __VLS_122({
    modelValue: (__VLS_ctx.form.password),
    showPassword: true,
    placeholder: "Password",
}));
const __VLS_124 = __VLS_123({
    modelValue: (__VLS_ctx.form.password),
    showPassword: true,
    placeholder: "Password",
}, ...__VLS_functionalComponentArgsRest(__VLS_123));
// @ts-ignore
[form,];
// @ts-ignore
[];
var __VLS_119;
const __VLS_128 = {}.ElFormItem;
/** @type {[typeof ___VLS_components.ElFormItem, typeof ___VLS_components.elFormItem, typeof ___VLS_components.ElFormItem, typeof ___VLS_components.elFormItem, ]} */ ;
// @ts-ignore
ElFormItem;
// @ts-ignore
const __VLS_129 = __VLS_asFunctionalComponent(__VLS_128, new __VLS_128({
    label: "Remark",
    prop: "remark",
}));
const __VLS_130 = __VLS_129({
    label: "Remark",
    prop: "remark",
}, ...__VLS_functionalComponentArgsRest(__VLS_129));
const { default: __VLS_133 } = __VLS_131.slots;
const __VLS_134 = {}.ElInput;
/** @type {[typeof ___VLS_components.ElInput, typeof ___VLS_components.elInput, ]} */ ;
// @ts-ignore
ElInput;
// @ts-ignore
const __VLS_135 = __VLS_asFunctionalComponent(__VLS_134, new __VLS_134({
    modelValue: (__VLS_ctx.form.remark),
    type: "textarea",
    placeholder: "Optional notes",
}));
const __VLS_136 = __VLS_135({
    modelValue: (__VLS_ctx.form.remark),
    type: "textarea",
    placeholder: "Optional notes",
}, ...__VLS_functionalComponentArgsRest(__VLS_135));
// @ts-ignore
[form,];
// @ts-ignore
[];
var __VLS_131;
// @ts-ignore
[];
var __VLS_87;
{
    const { footer: __VLS_140 } = __VLS_81.slots;
    __VLS_asFunctionalElement(__VLS_intrinsics.span, __VLS_intrinsics.span)({
        ...{ class: "dialog-footer" },
    });
    /** @type {__VLS_StyleScopedClasses['dialog-footer']} */ ;
    const __VLS_141 = {}.ElButton;
    /** @type {[typeof ___VLS_components.ElButton, typeof ___VLS_components.elButton, typeof ___VLS_components.ElButton, typeof ___VLS_components.elButton, ]} */ ;
    // @ts-ignore
    ElButton;
    // @ts-ignore
    const __VLS_142 = __VLS_asFunctionalComponent(__VLS_141, new __VLS_141({
        ...{ 'onClick': {} },
    }));
    const __VLS_143 = __VLS_142({
        ...{ 'onClick': {} },
    }, ...__VLS_functionalComponentArgsRest(__VLS_142));
    let __VLS_146;
    const __VLS_147 = ({ click: {} },
        { onClick: (...[$event]) => {
                __VLS_ctx.dialogVisible = false;
                // @ts-ignore
                [dialogVisible,];
            } });
    const { default: __VLS_148 } = __VLS_144.slots;
    // @ts-ignore
    [];
    var __VLS_144;
    var __VLS_145;
    const __VLS_149 = {}.ElButton;
    /** @type {[typeof ___VLS_components.ElButton, typeof ___VLS_components.elButton, typeof ___VLS_components.ElButton, typeof ___VLS_components.elButton, ]} */ ;
    // @ts-ignore
    ElButton;
    // @ts-ignore
    const __VLS_150 = __VLS_asFunctionalComponent(__VLS_149, new __VLS_149({
        ...{ 'onClick': {} },
        type: "primary",
    }));
    const __VLS_151 = __VLS_150({
        ...{ 'onClick': {} },
        type: "primary",
    }, ...__VLS_functionalComponentArgsRest(__VLS_150));
    let __VLS_154;
    const __VLS_155 = ({ click: {} },
        { onClick: (...[$event]) => {
                __VLS_ctx.submitForm(__VLS_ctx.formRef);
                // @ts-ignore
                [submitForm, formRef,];
            } });
    const { default: __VLS_156 } = __VLS_152.slots;
    // @ts-ignore
    [];
    var __VLS_152;
    var __VLS_153;
    // @ts-ignore
    [];
}
// @ts-ignore
[];
var __VLS_81;
// @ts-ignore
var __VLS_90 = __VLS_89;
// @ts-ignore
[];
const __VLS_export = (await import('vue')).defineComponent({
    __typeProps: {},
});
export default {};
