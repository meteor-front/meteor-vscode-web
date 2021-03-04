import widgetTypes from '@/components/factory/widgetTypes'
import input from './input'
import text from './basic/text'
import block from './basic/block'
import icon from './basic/icon'
import elButton from './basic/elButton'
import elButtonGroup from './basic/elButtonGroup'
import elLink from './basic/elLink'
import elRadio from './basic/elRadio'
import elRadioGroup from './basic/elRadioGroup'
import elCheckbox from './basic/elCheckbox'
import elCheckboxGroup from './basic/elCheckboxGroup'
import container from './layout/container'
import elHeader from './layout/elHeader'
import elAside from './layout/elAside'
import elMain from './layout/elMain'
import elFooter from './layout/elFooter'
import elRow from './layout/elRow'
import elCol from './layout/elCol'
import elInputNumber from './basic/elInputNumber'
import elSelect from './basic/elSelect'
import elOption from './basic/elOption'
import pageCommon from './basic/pageCommon'

export default {
  PageCommon: pageCommon,
  [widgetTypes.basicInput]: input,
  [widgetTypes.basicText]: text,
  [widgetTypes.basicBlock]: block,
  [widgetTypes.basicIcon]: icon,
  [widgetTypes.basicElButton]: elButton,
  [widgetTypes.basicElButtonGroup]: elButtonGroup,
  [widgetTypes.basicElLink]: elLink,
  [widgetTypes.basicElRadio]: elRadio,
  [widgetTypes.basicElRadioGroup]: elRadioGroup,
  [widgetTypes.basicElCheckbox]: elCheckbox,
  [widgetTypes.basicElCheckboxGroup]: elCheckboxGroup,
  [widgetTypes.layoutContainer]: container,
  [widgetTypes.layoutElHeader]: elHeader,
  [widgetTypes.layoutElAside]: elAside,
  [widgetTypes.layoutElMain]: elMain,
  [widgetTypes.layoutElFooter]: elFooter,
  [widgetTypes.layoutElRow]: elRow,
  [widgetTypes.layoutElCol]: elCol,
  [widgetTypes.basicElInputNumber]: elInputNumber,
  [widgetTypes.basicElSelect]: elSelect,
  [widgetTypes.basicElOption]: elOption
}
