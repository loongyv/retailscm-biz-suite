

import React, { Component } from 'react'
import FontAwesome from 'react-fontawesome';
import { connect } from 'dva'
import moment from 'moment'
import BooleanOption from 'components/BooleanOption';
import { Row, Col, Icon, Card, Tabs, Table, Radio, DatePicker, Tooltip, Menu, Dropdown,Badge, Switch,Select,Form,AutoComplete,Modal } from 'antd'
import { Link, Route, Redirect} from 'dva/router'
import numeral from 'numeral'

import DashboardTool from '../../common/Dashboard.tool'
import PageHeaderLayout from '../../layouts/PageHeaderLayout'
import styles from './ConsumerOrderPaymentGroup.profile.less'
import DescriptionList from '../../components/DescriptionList';

import GlobalComponents from '../../custcomponents';
import PermissionSetting from '../../permission/PermissionSetting'
import appLocaleName from '../../common/Locale.tool'
const { Description } = DescriptionList;
const {defaultRenderExtraHeader}= DashboardTool


/////////////////////////////////////////////////////////////////////////////////////////////////////////////////


const internalSummaryOf = (consumerOrderPaymentGroup,targetComponent) =>{
    const userContext = null
	return (
	<DescriptionList className={styles.headerList} size="small" col="4">
<Description term="Id">{consumerOrderPaymentGroup.id}</Description> 
<Description term="Name">{consumerOrderPaymentGroup.name}</Description> 
<Description term="Card Number">{consumerOrderPaymentGroup.cardNumber}</Description> 
	
      </DescriptionList>
	)
}


const renderPermissionSetting = consumerOrderPaymentGroup => {
  const {ConsumerOrderPaymentGroupBase} = GlobalComponents
  return <PermissionSetting targetObject={consumerOrderPaymentGroup}  targetObjectMeta={ConsumerOrderPaymentGroupBase}/>
}

const internalRenderExtraHeader = defaultRenderExtraHeader

class ConsumerOrderPaymentGroupPermission extends Component {


  componentDidMount() {

  }
  

  render() {
    // eslint-disable-next-line max-len
    const  consumerOrderPaymentGroup = this.props.consumerOrderPaymentGroup;
    const { id,displayName,  } = consumerOrderPaymentGroup
    const cardsData = {cardsName:"Consumer Order Payment Group",cardsFor: "consumerOrderPaymentGroup",cardsSource: consumerOrderPaymentGroup,
  		subItems: [
    
      	],
  	};
    const renderExtraHeader = this.props.renderExtraHeader || internalRenderExtraHeader
    const summaryOf = this.props.summaryOf || internalSummaryOf
   
    return (

      <PageHeaderLayout
        title={`${cardsData.cardsName}: ${displayName}`}
        content={summaryOf(cardsData.cardsSource,this)}
        wrapperClassName={styles.advancedForm}
      >
      {renderExtraHeader(cardsData.cardsSource)}
      {renderPermissionSetting(cardsData.cardsSource)}
      
      </PageHeaderLayout>
    )
  }
}

export default connect(state => ({
  consumerOrderPaymentGroup: state._consumerOrderPaymentGroup,
}))(Form.create()(ConsumerOrderPaymentGroupPermission))

