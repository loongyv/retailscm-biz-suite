import React from 'react'
import { Icon,Divider } from 'antd'

import { Link } from 'dva/router'
import moment from 'moment'
import ImagePreview from '../../components/ImagePreview'
import appLocaleName from '../../common/Locale.tool'
import BaseTool from '../../common/Base.tool'
import GlobalComponents from '../../custcomponents'
import DescriptionList from '../../components/DescriptionList'
const { Description } = DescriptionList
const {
	defaultRenderReferenceCell,
	defaultRenderBooleanCell,
	defaultRenderMoneyCell,
	defaultRenderDateTimeCell,
	defaultRenderImageCell,
	defaultRenderDateCell,
	defaultRenderIdentifier,
	defaultRenderTextCell,
} = BaseTool

const renderTextCell=defaultRenderTextCell
const renderIdentifier=defaultRenderIdentifier
const renderDateCell=defaultRenderDateCell
const renderDateTimeCell=defaultRenderDateTimeCell
const renderImageCell=defaultRenderImageCell
const renderMoneyCell=defaultRenderMoneyCell
const renderBooleanCell=defaultRenderBooleanCell
const renderReferenceCell=defaultRenderReferenceCell


const menuData = {menuName:"Consumer Order Shipping Group", menuFor: "consumerOrderShippingGroup",
  		subItems: [
  
  		],
}

const fieldLabels = {
  id: 'Id',
  name: 'Name',
  bizOrder: 'Biz Order',
  amount: 'Amount',

}

const displayColumns = [
  { title: fieldLabels.id, debugtype: 'string', dataIndex: 'id', width: '20',render: (text, record)=>renderTextCell(text,record)},
  { title: fieldLabels.name, debugtype: 'string', dataIndex: 'name', width: '10',render: (text, record)=>renderTextCell(text,record)},
  { title: fieldLabels.bizOrder, dataIndex: 'bizOrder', render: (text, record) => renderReferenceCell(text, record), sorter:true},
  { title: fieldLabels.amount, dataIndex: 'amount', className:'money', render: (text, record) => renderMoneyCell(text, record), sorter: true  },

]
// refernce to https://ant.design/components/list-cn/
const renderItemOfList=(consumerOrderShippingGroup,targetComponent)=>{

	
	
	
	const userContext = null
	return (
	<div key={consumerOrderShippingGroup.id}>
	
	<DescriptionList  key={consumerOrderShippingGroup.id} size="small" col="4">
<Description term="Id">{consumerOrderShippingGroup.id}</Description> 
<Description term="Name">{consumerOrderShippingGroup.name}</Description> 
<Description term="Biz Order">{consumerOrderShippingGroup.bizOrder==null?appLocaleName(userContext,"NotAssigned"):`${consumerOrderShippingGroup.bizOrder.displayName}(${consumerOrderShippingGroup.bizOrder.id})`}
</Description>
<Description term="Amount">{consumerOrderShippingGroup.amount}</Description> 
	
        
      </DescriptionList>
       <Divider style={{ height: '2px' }} />
      </div>
	)

}
	



const ConsumerOrderShippingGroupBase={menuData,displayColumns,fieldLabels,renderItemOfList}
export default ConsumerOrderShippingGroupBase



