import widgetTypes from '@/components/factory/widgetTypes'
import input from './basic/input'
import basicElButton from './basic/elButton'
import basicElButtonGroup from './basic/elButtonGroup'
import basicElLink from './basic/elLink'
import basicElRadio from './basic/elRadio'
import basicElRadioGroup from './basic/elRadioGroup'
import basicElCheckbox from './basic/elCheckbox'
import basicElCheckboxGroup from './basic/elCheckboxGroup'
import layoutContainer from './layout/contaner'
import layoutElHeader from './layout/elHeader'
import layoutElAside from './layout/elAside'
import layoutElMain from './layout/elMain'
import layoutElFooter from './layout/elFooter'
import layoutElRow from './layout/elRow'
import layoutElCol from './layout/elCol'
import basicElInputNumber from './basic/elInputNumber'
import basicElSelect from './basic/elSelect'
export default {

  component: {
    input,
    basicElButton,
    basicElButtonGroup,
    basicElLink,
    basicElRadio,
    basicElRadioGroup,
    basicElCheckbox,
    basicElCheckboxGroup,
    layoutContainer,
    layoutElHeader,
    layoutElAside,
    layoutElMain,
    layoutElFooter,
    layoutElRow,
    layoutElCol,
    basicElInputNumber,
    basicElSelect
  },
  componentName: {
    [widgetTypes.basicInput]: input.name,
    [widgetTypes.basicElButton]: basicElButton.name,
    [widgetTypes.basicElButtonGroup]: basicElButtonGroup.name,
    [widgetTypes.basicElLink]: basicElLink.name,
    [widgetTypes.basicElRadio]: basicElRadio.name,
    [widgetTypes.basicElRadioGroup]: basicElRadioGroup.name,
    [widgetTypes.basicElCheckbox]: basicElCheckbox.name,
    [widgetTypes.basicElCheckboxGroup]: basicElCheckboxGroup.name,
    [widgetTypes.layoutContainer]: layoutContainer.name,
    [widgetTypes.layoutElHeader]: layoutElHeader.name,
    [widgetTypes.layoutElAside]: layoutElAside.name,
    [widgetTypes.layoutElMain]: layoutElMain.name,
    [widgetTypes.layoutElFooter]: layoutElFooter.name,
    [widgetTypes.layoutElRow]: layoutElRow.name,
    [widgetTypes.layoutElCol]: layoutElCol.name,
    [widgetTypes.basicElInputNumber]: basicElInputNumber.name,
    [widgetTypes.basicElSelect]: basicElSelect.name
  }
}
