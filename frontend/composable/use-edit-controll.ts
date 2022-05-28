import { ref, reactive, computed } from '@nuxtjs/composition-api'
import { useAuthenticated } from '@/composable/use-authenticated'

/**
 * Edit データ種別
 */
export const editTypes = {
  eyecatch: 'eyecatch',
  information: 'information',
  news: 'news',
  service: 'service',
  work: 'work',
  contact: 'contact',
  menu: 'menu',
  none: 'none',
} as const
export type EditTypeKey = typeof editTypes[keyof typeof editTypes]

/**
 * Edit アクション操作
 */
export const editActions = {
  create: 'create',
  update: 'update',
  moddel: 'moddel',
  none: 'none',
} as const
export type EditActionKey = typeof editActions[keyof typeof editActions]

export interface EditProps {
  show?: boolean
  type: EditTypeKey
  action: EditActionKey
  id?: number
}

/**
 * Activator Icon 部品アイコンや色定義
 */
const action2icon = {
  [editActions.create]: 'plus-circle',
  [editActions.update]: 'pencil-square',
  [editActions.moddel]: 'pencil-fill',
  [editActions.none]: 'exclamation-triangle',
} as const
const action2variant = {
  [editActions.create]: 'info',
  [editActions.update]: 'success',
  [editActions.moddel]: 'success',
  [editActions.none]: 'danger',
} as const

/**
 * editType とフォームコンポーネンント
 */
const type2Component = {
  [editTypes.eyecatch]: 'EyecatcherForm',
  [editTypes.information]: 'InformationForm',
  [editTypes.news]: 'NewsForm',
  [editTypes.service]: 'ServiceForm',
  [editTypes.work]: 'InformationForm',
  [editTypes.contact]: 'ContactForm',
  [editTypes.menu]: 'InformationForm',
  [editTypes.none]: 'NoneForm',
} as const

/**
 * Edit Activator Object
 */
const activator = reactive<EditProps>({
  show: false,
  type: editTypes.none,
  action: editActions.none,
  id: 0,
})

/**
 * Use Edit Controll
 */
export const useEditControll = () => {
  const getActivator = () => activator

  const activate = (editProps: EditProps) => {
    Object.assign(activator, {
      show: true,
      type: editProps.type,
      action: editProps.action,
      id: editProps.id,
    })
  }

  const inactivate = () => {
    Object.assign(activator, {
      show: false,
      type: editTypes.none,
      action: editActions.none,
      id: 0,
    })
  }

  const setActivatorShow = (show: boolean) => {
    Object.assign(activator, { show })
  }

  const getActivatorIcon = (editProps: EditProps) =>
    action2icon[editProps.action as keyof typeof action2icon] ??
    'exclamation-triangle'

  const getActivatorColor = (editProps: EditProps) =>
    action2variant[editProps.action as keyof typeof action2variant] ?? 'danger'

  const getFormComponent = (editProps: EditProps) =>
    type2Component[editProps.type as keyof typeof type2Component] ?? 'NoneForm'

  const getFormTitle = (editProps: EditProps) =>
    editProps.action === editActions.create
      ? 'コンテンツの追加'
      : editProps.action === editActions.moddel
      ? 'コンテンツの編集・削除'
      : 'コンテンツの編集'

  const isCreateAction = (action: string) => action === editActions.create
  const isUpdateAction = (action: string) =>
    action === editActions.update || action === editActions.moddel
  const isDeleteAction = (action: string) => action === editActions.moddel

  return {
    getActivator,
    activate,
    inactivate,
    setActivatorShow,
    getActivatorIcon,
    getActivatorColor,
    getFormComponent,
    getFormTitle,
    isCreateAction,
    isUpdateAction,
    isDeleteAction,
  }
}

/**
 * Preview mode boolean
 */
const isPreview = ref(false)

/**
 * Use Preview Controll
 */
export const usePreviewControll = () => {
  const { isAuthenticated } = useAuthenticated()

  const isEditable = computed(() => isAuthenticated.value && !isPreview.value)
  const isOnPreview = computed(() => isAuthenticated.value && isPreview.value)

  const togglePreview = () => {
    isPreview.value = !isPreview.value
  }

  return {
    isEditable,
    isOnPreview,
    togglePreview,
  }
}
