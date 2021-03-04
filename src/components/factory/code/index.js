import widgetTypes from '@/components/factory/widgetTypes'
import basicInput from './basic/input'
import basicText from './basic/text'
import basicBlock from './basic/block'
import basicIcon from './basic/icon'
import basicElButtonGroup from './basic/elButtonGroup'
import basicElButton from './basic/elButton'
import basicElLink from './basic/elLink'
import basicElRadio from './basic/elRadio'
import basicElRadioGroup from './basic/elRadioGroup'
import basicElCheckbox from './basic/elCheckbox'
import basicElCheckboxGroup from './basic/elCheckboxGroup'
import layoutContainer from './layout/container'
import layoutElHeader from './layout/elHeader'
import layoutElAside from './layout/elAside'
import layoutElMain from './layout/elMain'
import layoutElFooter from './layout/elFooter'
import layoutElRow from './layout/elRow'
import layoutElCol from './layout/elCol'
import basicElInputNumber from './basic/elInputNumber'
import basicPage from './basic/basicPage'

export default {
  BasicPage: basicPage,
  [widgetTypes.basicInput]: basicInput,
  [widgetTypes.basicText]: basicText,
  [widgetTypes.basicBlock]: basicBlock,
  [widgetTypes.basicIcon]: basicIcon,
  [widgetTypes.basicElButtonGroup]: basicElButtonGroup,
  [widgetTypes.basicElButton]: basicElButton,
  [widgetTypes.basicElLink]: basicElLink,
  [widgetTypes.basicElRadio]: basicElRadio,
  [widgetTypes.basicElRadioGroup]: basicElRadioGroup,
  [widgetTypes.basicElCheckbox]: basicElCheckbox,
  [widgetTypes.basicElCheckboxGroup]: basicElCheckboxGroup,
  [widgetTypes.layoutContainer]: layoutContainer,
  [widgetTypes.layoutElHeader]: layoutElHeader,
  [widgetTypes.layoutElAside]: layoutElAside,
  [widgetTypes.layoutElMain]: layoutElMain,
  [widgetTypes.layoutElFooter]: layoutElFooter,
  [widgetTypes.layoutElRow]: layoutElRow,
  [widgetTypes.layoutElCol]: layoutElCol,
  [widgetTypes.basicElInputNumber]: basicElInputNumber
}
