

import React, { Component } from 'react'
import FontAwesome from 'react-fontawesome';
import { connect } from 'dva'
import moment from 'moment'
import BooleanOption from 'components/BooleanOption';
import { Row, Col, Icon, Card, Tabs, Table, Radio, DatePicker, Tooltip, Menu, Dropdown,Badge, Switch,Select,Form,AutoComplete,Modal } from 'antd'
import { Link, Route, Redirect} from 'dva/router'
import numeral from 'numeral'
import {
  ChartCard, yuan, MiniArea, MiniBar, MiniProgress, Field, Bar, Pie, TimelineChart,
} from '../../components/Charts'
import Trend from '../../components/Trend'
import NumberInfo from '../../components/NumberInfo'
import { getTimeDistance } from '../../utils/utils'
import PageHeaderLayout from '../../layouts/PageHeaderLayout'
import styles from './RetailStoreOrder.dashboard.less'
import DescriptionList from '../../components/DescriptionList';
import ImagePreview from '../../components/ImagePreview';
import GlobalComponents from '../../custcomponents';
import DashboardTool from '../../common/Dashboard.tool'
import appLocaleName from '../../common/Locale.tool'

const {aggregateDataset,calcKey, defaultHideCloseTrans,
  defaultImageListOf,defaultSettingListOf,defaultBuildTransferModal,
  defaultExecuteTrans,defaultHandleTransferSearch,defaultShowTransferModel,
  defaultRenderExtraHeader,
  defaultSubListsOf,defaultRenderAnalytics,
  defaultRenderExtraFooter,renderForTimeLine,renderForNumbers,
  defaultQuickFunctions, defaultRenderSubjectList,
}= DashboardTool



const { Description } = DescriptionList;
const { TabPane } = Tabs
const { RangePicker } = DatePicker
const { Option } = Select


const imageList =(retailStoreOrder)=>{return [
	 ]}

const internalImageListOf = (retailStoreOrder) =>defaultImageListOf(retailStoreOrder,imageList)

const optionList =(retailStoreOrder)=>{return [ 
	]}

const buildTransferModal = defaultBuildTransferModal
const showTransferModel = defaultShowTransferModel
const internalRenderSubjectList = defaultRenderSubjectList
const internalSettingListOf = (retailStoreOrder) =>defaultSettingListOf(retailStoreOrder, optionList)
const internalLargeTextOf = (retailStoreOrder) =>{

	return null
	

}


const internalRenderExtraHeader = defaultRenderExtraHeader

const internalRenderExtraFooter = defaultRenderExtraFooter
const internalSubListsOf = defaultSubListsOf


const internalRenderTitle = (cardsData,targetComponent) =>{
  
  
  const linkComp=cardsData.returnURL?<Link to={cardsData.returnURL}> <FontAwesome name="arrow-left"  /> </Link>:null
  return (<div>{linkComp}{cardsData.cardsName}: {cardsData.displayName}</div>)

}


const internalSummaryOf = (retailStoreOrder,targetComponent) =>{
	
	
	const {RetailStoreOrderService} = GlobalComponents
	const userContext = null
	return (
	<DescriptionList className={styles.headerList} size="small" col="4">
<Description term="Id">{retailStoreOrder.id}</Description> 
<Description term="Buyer">{retailStoreOrder.buyer==null?appLocaleName(userContext,"NotAssigned"):`${retailStoreOrder.buyer.displayName}(${retailStoreOrder.buyer.id})`}
 <Icon type="swap" onClick={()=>
  showTransferModel(targetComponent,"Buyer","retailStore",RetailStoreOrderService.requestCandidateBuyer,
	      RetailStoreOrderService.transferToAnotherBuyer,"anotherBuyerId",retailStoreOrder.buyer?retailStoreOrder.buyer.id:"")} 
  style={{fontSize: 20,color:"red"}} />
</Description>
<Description term="Title">{retailStoreOrder.title}</Description> 
<Description term="Total Amount">{retailStoreOrder.totalAmount}</Description> 
<Description term="Last Update Time">{ moment(retailStoreOrder.lastUpdateTime).format('YYYY-MM-DD')}</Description> 
<Description term="Current Status">{retailStoreOrder.currentStatus}</Description> 
	
        {buildTransferModal(retailStoreOrder,targetComponent)}
      </DescriptionList>
	)

}

const internalQuickFunctions = defaultQuickFunctions

class RetailStoreOrderDashboard extends Component {

 state = {
    transferModalVisiable: false,
    candidateReferenceList: {},
    candidateServiceName:"",
    candidateObjectType:"city",
    targetLocalName:"",
    transferServiceName:"",
    currentValue:"",
    transferTargetParameterName:"",  
    defaultType: 'retailStoreOrder'


  }
  componentDidMount() {

  }
  

  render() {
    // eslint-disable-next-line max-len
    const { id,displayName, retailStoreOrderLineItemListMetaInfo, retailStoreOrderShippingGroupListMetaInfo, retailStoreOrderPaymentGroupListMetaInfo, goodsListMetaInfo, retailStoreOrderLineItemCount, retailStoreOrderShippingGroupCount, retailStoreOrderPaymentGroupCount, goodsCount } = this.props.retailStoreOrder
    if(!this.props.retailStoreOrder.class){
      return null
    }
    const returnURL = this.props.returnURL
    
    const cardsData = {cardsName:"Retail Store Order",cardsFor: "retailStoreOrder",
    	cardsSource: this.props.retailStoreOrder,returnURL,displayName,
  		subItems: [
{name: 'retailStoreOrderLineItemList', displayName:'Retail Store Order Line Item',type:'retailStoreOrderLineItem',count:retailStoreOrderLineItemCount,addFunction: true, role: 'retailStoreOrderLineItem', metaInfo: retailStoreOrderLineItemListMetaInfo, renderItem: GlobalComponents.RetailStoreOrderLineItemBase.renderItemOfList},
{name: 'retailStoreOrderShippingGroupList', displayName:'Retail Store Order Shipping Group',type:'retailStoreOrderShippingGroup',count:retailStoreOrderShippingGroupCount,addFunction: true, role: 'retailStoreOrderShippingGroup', metaInfo: retailStoreOrderShippingGroupListMetaInfo, renderItem: GlobalComponents.RetailStoreOrderShippingGroupBase.renderItemOfList},
{name: 'retailStoreOrderPaymentGroupList', displayName:'Retail Store Order Payment Group',type:'retailStoreOrderPaymentGroup',count:retailStoreOrderPaymentGroupCount,addFunction: true, role: 'retailStoreOrderPaymentGroup', metaInfo: retailStoreOrderPaymentGroupListMetaInfo, renderItem: GlobalComponents.RetailStoreOrderPaymentGroupBase.renderItemOfList},
{name: 'goodsList', displayName:'Goods',type:'goods',count:goodsCount,addFunction: true, role: 'goods', metaInfo: goodsListMetaInfo, renderItem: GlobalComponents.GoodsBase.renderItemOfList},
    
      	],
  	};
    
    const renderExtraHeader = this.props.renderExtraHeader || internalRenderExtraHeader
    const settingListOf = this.props.settingListOf || internalSettingListOf
    const imageListOf = this.props.imageListOf || internalImageListOf
    const subListsOf = this.props.subListsOf || internalSubListsOf
    const largeTextOf = this.props.largeTextOf ||internalLargeTextOf
    const summaryOf = this.props.summaryOf || internalSummaryOf
    const renderTitle = this.props.renderTitle || internalRenderTitle
    const renderExtraFooter = this.props.renderExtraFooter || internalRenderExtraFooter
    const renderAnalytics = this.props.renderAnalytics || defaultRenderAnalytics
    const quickFunctions = this.props.quickFunctions || internalQuickFunctions
    const renderSubjectList = this.props.renderSubjectList || internalRenderSubjectList
    
    return (

      <PageHeaderLayout
        title={renderTitle(cardsData,this)}
        content={summaryOf(cardsData.cardsSource,this)}
        wrapperClassName={styles.advancedForm}
      >
       
        {renderExtraHeader(cardsData.cardsSource)}
        {quickFunctions(cardsData)} 
        {renderAnalytics(cardsData.cardsSource)}
        {settingListOf(cardsData.cardsSource)}
        {imageListOf(cardsData.cardsSource)}  
        {renderSubjectList(cardsData)}       
        {largeTextOf(cardsData.cardsSource)}
        {renderExtraFooter(cardsData.cardsSource)}
  		
      </PageHeaderLayout>
    
    )
  }
}

export default connect(state => ({
  retailStoreOrder: state._retailStoreOrder,
  returnURL: state.breadcrumb.returnURL,
  
}))(Form.create()(RetailStoreOrderDashboard))

