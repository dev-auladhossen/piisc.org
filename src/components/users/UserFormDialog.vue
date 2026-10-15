<script setup>
import { computed, nextTick, reactive, ref, watch } from 'vue'
import { createUser, updateUser, userErrorKind } from '../../services/userApi.js'
import { useDialogLock } from '../../composables/useDialogLock.js'
import { useI18n } from '../../composables/useI18n.js'
const props = defineProps({ open:Boolean, mode:{type:String,default:'create'}, user:{type:Object,default:null}, currentUserId:String })
const emit = defineEmits(['saved','cancel'])
const { tr } = useI18n()
const dialog=ref(null), nameInput=ref(null), idInput=ref(null), submitting=ref(false), error=ref(''), invalid=reactive({name:'',identifier:''})
const form=reactive({name:'',role:'teacher',email:'',studentId:''})
const identifierValue=computed({get:()=>isStudent()?form.studentId:form.email,set:value=>{if(isStudent())form.studentId=value;else form.email=value}})
const {lock,unlock}=useDialogLock()
const isStudent=()=> (props.mode==='edit' ? props.user?.role : form.role)==='student'
function clear(){form.name=props.user?.name||'';form.role=props.user?.role||'teacher';form.email=props.user?.email||'';form.studentId=props.user?.studentId||'';error.value='';invalid.name='';invalid.identifier=''}
watch(()=>props.open,async open=>{await nextTick();if(open){clear();if(dialog.value&&!dialog.value.open){dialog.value.showModal();lock()}await nextTick();nameInput.value?.focus()}else if(dialog.value?.open){dialog.value.close();unlock()}},{flush:'post'})
function closed(){unlock();if(props.open) return}
function changeRole(){form.email='';form.studentId='';invalid.identifier=''}
async function submit(){if(submitting.value)return;error.value='';invalid.name='';invalid.identifier='';const name=form.name.trim();if(name.length<2||name.length>80)invalid.name='Name must be 2 to 80 characters.';const ident=isStudent()?form.studentId:form.email;const identValid=isStudent()?/^PIISC-\d{4}-\d{3}$/i.test(ident):/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(ident);if(!identValid)invalid.identifier=isStudent()?'Enter a Student ID in the required format.':'Enter a valid email address.';if(invalid.name||invalid.identifier){await nextTick();(invalid.name?nameInput:idInput).value?.focus();return}submitting.value=true;try{const response=props.mode==='create'?await createUser({name,role:form.role,...(isStudent()?{studentId:ident}:{email:ident})}):await updateUser(props.user._id,{name,...(isStudent()?{studentId:ident}:{email:ident})});emit('saved',response)}catch(e){const kind=userErrorKind(e);error.value=kind==='conflict'?(isStudent()?'This Student ID is already in use.':'This email is already in use.'):kind==='validation'?'Please check the details and try again.':kind==='forbidden'?'You do not have permission to do this.':kind==='notfound'?'This user no longer exists.':kind==='rate_limited'?'Too many attempts. Please wait a few minutes and try again.':kind==='network'?'Cannot reach the server. Check your connection and try again.':'Something went wrong. Please try again.';await nextTick();(invalid.name?nameInput:idInput).value?.focus()}finally{submitting.value=false}}
function cancel(){if(!submitting.value)emit('cancel')}
</script>
<template>
<dialog ref="dialog" aria-labelledby="user-form-title" class="fixed inset-0 m-auto max-h-[calc(100dvh-32px)] w-[calc(100%-32px)] max-w-xl overflow-y-auto rounded-xl border-0 bg-white p-6 text-[#173f8e] shadow-2xl" @cancel.prevent="cancel" @close="closed">
 <h2 id="user-form-title" class="text-xl font-bold">{{ tr(mode==='create'?'Create user':'Edit user') }}</h2>
 <form class="mt-5 space-y-4" novalidate @submit.prevent="submit">
  <div><label for="user-name" class="mb-1 block text-sm font-semibold">{{ tr('Full name') }}</label><input id="user-name" ref="nameInput" v-model="form.name" maxlength="80" :disabled="submitting" :aria-invalid="!!invalid.name" :aria-describedby="invalid.name?'user-name-error':undefined" class="min-h-11 w-full rounded-lg border border-slate-300 px-3 text-base focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#d9b33d]"/><p v-if="invalid.name" id="user-name-error" role="alert" class="mt-1 text-sm text-red-700">{{ tr(invalid.name) }}</p></div>
  <div v-if="mode==='create'"><label for="user-role" class="mb-1 block text-sm font-semibold">{{ tr('Role') }}</label><select id="user-role" v-model="form.role" :disabled="submitting" class="min-h-11 w-full rounded-lg border border-slate-300 px-3 text-base" @change="changeRole"><option v-for="r in ['teacher','student','parent','admin']" :key="r" :value="r">{{ tr(({teacher:'Teacher',student:'Student',parent:'Parent',admin:'Admin'})[r]) }}</option></select></div>
  <p v-else class="text-sm"><strong>{{ tr('Role') }}:</strong> {{ tr(({teacher:'Teacher',student:'Student',parent:'Parent',admin:'Admin'})[user?.role]) }}. {{ tr('The role cannot be changed after the account is created.') }}</p>
  <div><label for="user-identifier" class="mb-1 block text-sm font-semibold">{{ tr(isStudent()?'Student ID':'Email') }}</label><input id="user-identifier" ref="idInput" v-model="identifierValue" :maxlength="isStudent()?13:254" :disabled="submitting" :aria-invalid="!!invalid.identifier" :aria-describedby="[isStudent()?'student-id-help':'',invalid.identifier?'user-identifier-error':''].filter(Boolean).join(' ')||undefined" class="min-h-11 w-full rounded-lg border border-slate-300 px-3 text-base focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#d9b33d]"/><p v-if="isStudent()" id="student-id-help" class="mt-1 text-sm text-slate-600">{{ tr('Format: PIISC-2027-001') }}</p><p v-if="invalid.identifier" id="user-identifier-error" role="alert" class="mt-1 text-sm text-red-700">{{ tr(invalid.identifier) }}</p></div>
  <p v-if="error" role="alert" class="rounded-lg bg-red-50 p-3 text-sm text-red-700">{{ tr(error) }}</p>
  <div class="flex justify-end gap-3"><button type="button" :disabled="submitting" class="rounded-full border px-4 py-2 text-sm disabled:opacity-60" @click="cancel">{{ tr('Cancel') }}</button><button type="submit" :disabled="submitting" class="rounded-full bg-[#294e9e] px-5 py-2 text-sm font-bold text-white disabled:opacity-60">{{ tr(submitting?'Saving…':'Save user') }}</button></div>
 </form>
</dialog>
</template>
<style scoped>dialog::backdrop{@apply bg-[rgba(21,27,38,0.60)]}dialog :is(button,input,select):focus-visible{@apply outline outline-[3px] outline-[#d9b33d] outline-offset-[3px]}</style>
