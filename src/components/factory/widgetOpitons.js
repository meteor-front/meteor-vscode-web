import widgetTypes from '@/components/factory/widgetTypes'
import { iconList } from '@/element/icon'
const commonOptons = {
  status: [{
    label: 'primary',
    value: 'primary'
  }, {
    label: 'success',
    value: 'success'
  }, {
    label: 'warning',
    value: 'warning'
  }, {
    label: 'danger',
    value: 'danger'
  }, {
    label: 'info',
    value: 'info'
  }, {
    label: 'text',
    value: 'text'
  }],
  size: [{
    label: 'mini',
    value: 'mini'
  }, {
    label: 'small',
    value: 'small'
  }, {
    label: 'medium',
    value: 'medium'
  }]
}
export default {
  [widgetTypes.basicInput]: {
    type: [{
      label: 'text',
      value: 'text'
    }, {
      label: 'number',
      value: 'number'
    }, {
      label: 'digit',
      value: 'digit'
    }, {
      label: 'password',
      value: 'password'
    }, {
      label: 'tel',
      value: 'tel'
    }, {
      label: 'file',
      value: 'file'
    }, {
      label: 'textarea',
      value: 'textarea'
    }],
    size: [{
      label: '大',
      value: ''
    }, {
      label: '中',
      value: 'medium'
    }, {
      label: '小',
      value: 'small'
    }, {
      label: '微小',
      value: 'mini'
    }],
    autocomplete: [{
      label: 'on',
      value: 'on'
    }, {
      label: 'off',
      value: 'off'
    }]
  },
  [widgetTypes.layoutContainer]: {
    direction: [{
      label: 'horizontal',
      value: 'horizontal'
    }, {
      label: 'vertical',
      value: 'vertical'
    }]
  },
  [widgetTypes.layoutElRow]: {
    type: [{
      label: 'flex',
      value: 'flex'
    }],
    justify: [{
      label: 'start',
      value: 'start'
    }, {
      label: 'end',
      value: 'end'
    }, {
      label: 'center',
      value: 'center'
    }, {
      label: 'space-around',
      value: 'space-around'
    }, {
      label: 'space-between',
      value: 'space-between'
    }],
    align: [{
      label: 'top',
      value: 'top'
    }, {
      label: 'middle',
      value: 'middle'
    }, {
      label: 'bottom',
      value: 'bottom'
    }]
  },
  [widgetTypes.basicIcon]: {
    icon: iconList
  },
  [widgetTypes.basicElButton]: {
    type: commonOptons.status,
    size: commonOptons.size,
    icon: iconList
  },
  [widgetTypes.basicElLink]: {
    type: commonOptons.status,
    icon: iconList
  },
  [widgetTypes.basicElRadio]: {
    size: commonOptons.size
  },
  [widgetTypes.basicElRadioGroup]: {
    size: commonOptons.size
  },
  [widgetTypes.basicElCheckbox]: {
    size: commonOptons.size
  },
  [widgetTypes.basicElInputNumber]: {
    size: commonOptons.size
  },
  [widgetTypes.basicElSelect]: {
    size: commonOptons.size
  }
}
