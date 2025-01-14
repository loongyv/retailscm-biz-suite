import React from 'react'
import PropTypes from 'prop-types'
import {
  Layout,
  Menu,
  Icon,
  Avatar,
  Dropdown,
  Tag,
  message,
  Spin,
  Breadcrumb,
  AutoComplete,
  Input,Button
} from 'antd'
import DocumentTitle from 'react-document-title'
import { connect } from 'dva'
import { Link, Route, Redirect, Switch } from 'dva/router'
import moment from 'moment'
import groupBy from 'lodash/groupBy'
import { ContainerQuery } from 'react-container-query'
import classNames from 'classnames'
import styles from './Warehouse.app.less'
import {sessionObject} from '../../utils/utils'

import HeaderSearch from '../../components/HeaderSearch';
import NoticeIcon from '../../components/NoticeIcon';
import GlobalFooter from '../../components/GlobalFooter';


import GlobalComponents from '../../custcomponents';

import PermissionSettingService from '../../permission/PermissionSetting.service'
import appLocaleName from '../../common/Locale.tool'
import BizAppTool from '../../common/BizApp.tool'

const { Header, Sider, Content } = Layout
const { SubMenu } = Menu
const {
  defaultFilteredNoGroupMenuItems,
  defaultFilteredMenuItemsGroup,
  defaultRenderMenuItem,

} = BizAppTool


const filteredNoGroupMenuItems = defaultFilteredNoGroupMenuItems
const filteredMenuItemsGroup = defaultFilteredMenuItemsGroup
const renderMenuItem=defaultRenderMenuItem



const query = {
  'screen-xs': {
    maxWidth: 575,
  },
  'screen-sm': {
    minWidth: 576,
    maxWidth: 767,
  },
  'screen-md': {
    minWidth: 768,
    maxWidth: 991,
  },
  'screen-lg': {
    minWidth: 992,
    maxWidth: 1199,
  },
  'screen-xl': {
    minWidth: 1200,
  },
}




class WarehouseBizApp extends React.PureComponent {
  constructor(props) {
    super(props)
     this.state = {
      openKeys: this.getDefaultCollapsedSubMenus(props),
    }
  }

  componentDidMount() {}
  componentWillUnmount() {
    clearTimeout(this.resizeTimeout)
  }
  onCollapse = (collapsed) => {
    this.props.dispatch({
      type: 'global/changeLayoutCollapsed',
      payload: collapsed,
    })
  }

  getDefaultCollapsedSubMenus = (props) => {
    const currentMenuSelectedKeys = [...this.getCurrentMenuSelectedKeys(props)]
    currentMenuSelectedKeys.splice(-1, 1)
    if (currentMenuSelectedKeys.length === 0) {
      return ['/warehouse/']
    }
    return currentMenuSelectedKeys
  }
  getCurrentMenuSelectedKeys = (props) => {
    const { location: { pathname } } = props || this.props
    const keys = pathname.split('/').slice(1)
    if (keys.length === 1 && keys[0] === '') {
      return [this.menus[0].key]
    }
    return keys
  }
  
  getNavMenuItems = (targetObject) => {
  

    const menuData = sessionObject('menuData')
    const targetApp = sessionObject('targetApp')
	const {objectId}=targetApp;
  	const userContext = null
    return (
      
		  <Menu
             theme="dark"
             mode="inline"
            
             
             onOpenChange={this.handleOpenChange}
            
             defaultOpenKeys={['firstOne']}
             style={{ margin: '16px 0', width: '100%' }}
           >
           

             <Menu.Item key="dashboard">
               <Link to={`/warehouse/${this.props.warehouse.id}/dashboard`}><Icon type="dashboard" /><span>{appLocaleName(userContext,"Dashboard")}</span></Link>
             </Menu.Item>
           
        {filteredNoGroupMenuItems(targetObject,this).map((item)=>(renderMenuItem(item)))}  
        {filteredMenuItemsGroup(targetObject,this).map((groupedMenuItem,index)=>{
          return(
    <SubMenu key={`vg${index}`} title={<span><Icon type="folder" /><span>{`${groupedMenuItem.viewGroup}`}</span></span>} >
      {groupedMenuItem.subItems.map((item)=>(renderMenuItem(item)))}  
    </SubMenu>

        )}
        )}

       		<SubMenu key="sub4" title={<span><Icon type="setting" /><span>{appLocaleName(userContext,"Setting")}</span></span>} >
       			<Menu.Item key="profile">
               		<Link to={`/warehouse/${this.props.warehouse.id}/permission`}><Icon type="safety-certificate" /><span>{appLocaleName(userContext,"Permission")}</span></Link>
             	</Menu.Item>
             	<Menu.Item key="permission">
               		<Link to={`/warehouse/${this.props.warehouse.id}/profile`}><Icon type="cluster" /><span>{appLocaleName(userContext,"Profile")}</span></Link>
             	</Menu.Item> 
      
        	</SubMenu>
        
           </Menu>
    )
  }
  



  getStorageSpaceSearch = () => {
    const {StorageSpaceSearch} = GlobalComponents;
    const userContext = null
    return connect(state => ({
      rule: state.rule,
      name: "Storage Space",
      role: "storageSpace",
      data: state._warehouse.storageSpaceList,
      metaInfo: state._warehouse.storageSpaceListMetaInfo,
      count: state._warehouse.storageSpaceCount,
      currentPage: state._warehouse.storageSpaceCurrentPageNumber,
      searchFormParameters: state._warehouse.storageSpaceSearchFormParameters,
      searchParameters: {...state._warehouse.searchParameters},
      expandForm: state._warehouse.expandForm,
      loading: state._warehouse.loading,
      partialList: state._warehouse.partialList,
      owner: { type: '_warehouse', id: state._warehouse.id, 
      referenceName: 'warehouse', 
      listName: 'storageSpaceList', ref:state._warehouse, 
      listDisplayName: appLocaleName(userContext,"List") }, // this is for model namespace and
    }))(StorageSpaceSearch)
  }
  getStorageSpaceCreateForm = () => {
   	const {StorageSpaceCreateForm} = GlobalComponents;
   	const userContext = null
    return connect(state => ({
      rule: state.rule,
      role: "storageSpace",
      data: state._warehouse.storageSpaceList,
      metaInfo: state._warehouse.storageSpaceListMetaInfo,
      count: state._warehouse.storageSpaceCount,
      currentPage: state._warehouse.storageSpaceCurrentPageNumber,
      searchFormParameters: state._warehouse.storageSpaceSearchFormParameters,
      loading: state._warehouse.loading,
      owner: { type: '_warehouse', id: state._warehouse.id, referenceName: 'warehouse', listName: 'storageSpaceList', ref:state._warehouse, listDisplayName: appLocaleName(userContext,"List")}, // this is for model namespace and
    }))(StorageSpaceCreateForm)
  }
  
  getStorageSpaceUpdateForm = () => {
    const userContext = null
  	const {StorageSpaceUpdateForm} = GlobalComponents;
    return connect(state => ({
      selectedRows: state._warehouse.selectedRows,
      role: "storageSpace",
      currentUpdateIndex: state._warehouse.currentUpdateIndex,
      owner: { type: '_warehouse', id: state._warehouse.id, listName: 'storageSpaceList', ref:state._warehouse, listDisplayName: appLocaleName(userContext,"List") }, // this is for model namespace and
    }))(StorageSpaceUpdateForm)
  }

  getSmartPalletSearch = () => {
    const {SmartPalletSearch} = GlobalComponents;
    const userContext = null
    return connect(state => ({
      rule: state.rule,
      name: "Smart Pallet",
      role: "smartPallet",
      data: state._warehouse.smartPalletList,
      metaInfo: state._warehouse.smartPalletListMetaInfo,
      count: state._warehouse.smartPalletCount,
      currentPage: state._warehouse.smartPalletCurrentPageNumber,
      searchFormParameters: state._warehouse.smartPalletSearchFormParameters,
      searchParameters: {...state._warehouse.searchParameters},
      expandForm: state._warehouse.expandForm,
      loading: state._warehouse.loading,
      partialList: state._warehouse.partialList,
      owner: { type: '_warehouse', id: state._warehouse.id, 
      referenceName: 'warehouse', 
      listName: 'smartPalletList', ref:state._warehouse, 
      listDisplayName: appLocaleName(userContext,"List") }, // this is for model namespace and
    }))(SmartPalletSearch)
  }
  getSmartPalletCreateForm = () => {
   	const {SmartPalletCreateForm} = GlobalComponents;
   	const userContext = null
    return connect(state => ({
      rule: state.rule,
      role: "smartPallet",
      data: state._warehouse.smartPalletList,
      metaInfo: state._warehouse.smartPalletListMetaInfo,
      count: state._warehouse.smartPalletCount,
      currentPage: state._warehouse.smartPalletCurrentPageNumber,
      searchFormParameters: state._warehouse.smartPalletSearchFormParameters,
      loading: state._warehouse.loading,
      owner: { type: '_warehouse', id: state._warehouse.id, referenceName: 'warehouse', listName: 'smartPalletList', ref:state._warehouse, listDisplayName: appLocaleName(userContext,"List")}, // this is for model namespace and
    }))(SmartPalletCreateForm)
  }
  
  getSmartPalletUpdateForm = () => {
    const userContext = null
  	const {SmartPalletUpdateForm} = GlobalComponents;
    return connect(state => ({
      selectedRows: state._warehouse.selectedRows,
      role: "smartPallet",
      currentUpdateIndex: state._warehouse.currentUpdateIndex,
      owner: { type: '_warehouse', id: state._warehouse.id, listName: 'smartPalletList', ref:state._warehouse, listDisplayName: appLocaleName(userContext,"List") }, // this is for model namespace and
    }))(SmartPalletUpdateForm)
  }

  getSupplierSpaceSearch = () => {
    const {SupplierSpaceSearch} = GlobalComponents;
    const userContext = null
    return connect(state => ({
      rule: state.rule,
      name: "Supplier Space",
      role: "supplierSpace",
      data: state._warehouse.supplierSpaceList,
      metaInfo: state._warehouse.supplierSpaceListMetaInfo,
      count: state._warehouse.supplierSpaceCount,
      currentPage: state._warehouse.supplierSpaceCurrentPageNumber,
      searchFormParameters: state._warehouse.supplierSpaceSearchFormParameters,
      searchParameters: {...state._warehouse.searchParameters},
      expandForm: state._warehouse.expandForm,
      loading: state._warehouse.loading,
      partialList: state._warehouse.partialList,
      owner: { type: '_warehouse', id: state._warehouse.id, 
      referenceName: 'warehouse', 
      listName: 'supplierSpaceList', ref:state._warehouse, 
      listDisplayName: appLocaleName(userContext,"List") }, // this is for model namespace and
    }))(SupplierSpaceSearch)
  }
  getSupplierSpaceCreateForm = () => {
   	const {SupplierSpaceCreateForm} = GlobalComponents;
   	const userContext = null
    return connect(state => ({
      rule: state.rule,
      role: "supplierSpace",
      data: state._warehouse.supplierSpaceList,
      metaInfo: state._warehouse.supplierSpaceListMetaInfo,
      count: state._warehouse.supplierSpaceCount,
      currentPage: state._warehouse.supplierSpaceCurrentPageNumber,
      searchFormParameters: state._warehouse.supplierSpaceSearchFormParameters,
      loading: state._warehouse.loading,
      owner: { type: '_warehouse', id: state._warehouse.id, referenceName: 'warehouse', listName: 'supplierSpaceList', ref:state._warehouse, listDisplayName: appLocaleName(userContext,"List")}, // this is for model namespace and
    }))(SupplierSpaceCreateForm)
  }
  
  getSupplierSpaceUpdateForm = () => {
    const userContext = null
  	const {SupplierSpaceUpdateForm} = GlobalComponents;
    return connect(state => ({
      selectedRows: state._warehouse.selectedRows,
      role: "supplierSpace",
      currentUpdateIndex: state._warehouse.currentUpdateIndex,
      owner: { type: '_warehouse', id: state._warehouse.id, listName: 'supplierSpaceList', ref:state._warehouse, listDisplayName: appLocaleName(userContext,"List") }, // this is for model namespace and
    }))(SupplierSpaceUpdateForm)
  }

  getReceivingSpaceSearch = () => {
    const {ReceivingSpaceSearch} = GlobalComponents;
    const userContext = null
    return connect(state => ({
      rule: state.rule,
      name: "Receiving Space",
      role: "receivingSpace",
      data: state._warehouse.receivingSpaceList,
      metaInfo: state._warehouse.receivingSpaceListMetaInfo,
      count: state._warehouse.receivingSpaceCount,
      currentPage: state._warehouse.receivingSpaceCurrentPageNumber,
      searchFormParameters: state._warehouse.receivingSpaceSearchFormParameters,
      searchParameters: {...state._warehouse.searchParameters},
      expandForm: state._warehouse.expandForm,
      loading: state._warehouse.loading,
      partialList: state._warehouse.partialList,
      owner: { type: '_warehouse', id: state._warehouse.id, 
      referenceName: 'warehouse', 
      listName: 'receivingSpaceList', ref:state._warehouse, 
      listDisplayName: appLocaleName(userContext,"List") }, // this is for model namespace and
    }))(ReceivingSpaceSearch)
  }
  getReceivingSpaceCreateForm = () => {
   	const {ReceivingSpaceCreateForm} = GlobalComponents;
   	const userContext = null
    return connect(state => ({
      rule: state.rule,
      role: "receivingSpace",
      data: state._warehouse.receivingSpaceList,
      metaInfo: state._warehouse.receivingSpaceListMetaInfo,
      count: state._warehouse.receivingSpaceCount,
      currentPage: state._warehouse.receivingSpaceCurrentPageNumber,
      searchFormParameters: state._warehouse.receivingSpaceSearchFormParameters,
      loading: state._warehouse.loading,
      owner: { type: '_warehouse', id: state._warehouse.id, referenceName: 'warehouse', listName: 'receivingSpaceList', ref:state._warehouse, listDisplayName: appLocaleName(userContext,"List")}, // this is for model namespace and
    }))(ReceivingSpaceCreateForm)
  }
  
  getReceivingSpaceUpdateForm = () => {
    const userContext = null
  	const {ReceivingSpaceUpdateForm} = GlobalComponents;
    return connect(state => ({
      selectedRows: state._warehouse.selectedRows,
      role: "receivingSpace",
      currentUpdateIndex: state._warehouse.currentUpdateIndex,
      owner: { type: '_warehouse', id: state._warehouse.id, listName: 'receivingSpaceList', ref:state._warehouse, listDisplayName: appLocaleName(userContext,"List") }, // this is for model namespace and
    }))(ReceivingSpaceUpdateForm)
  }

  getShippingSpaceSearch = () => {
    const {ShippingSpaceSearch} = GlobalComponents;
    const userContext = null
    return connect(state => ({
      rule: state.rule,
      name: "Shipping Space",
      role: "shippingSpace",
      data: state._warehouse.shippingSpaceList,
      metaInfo: state._warehouse.shippingSpaceListMetaInfo,
      count: state._warehouse.shippingSpaceCount,
      currentPage: state._warehouse.shippingSpaceCurrentPageNumber,
      searchFormParameters: state._warehouse.shippingSpaceSearchFormParameters,
      searchParameters: {...state._warehouse.searchParameters},
      expandForm: state._warehouse.expandForm,
      loading: state._warehouse.loading,
      partialList: state._warehouse.partialList,
      owner: { type: '_warehouse', id: state._warehouse.id, 
      referenceName: 'warehouse', 
      listName: 'shippingSpaceList', ref:state._warehouse, 
      listDisplayName: appLocaleName(userContext,"List") }, // this is for model namespace and
    }))(ShippingSpaceSearch)
  }
  getShippingSpaceCreateForm = () => {
   	const {ShippingSpaceCreateForm} = GlobalComponents;
   	const userContext = null
    return connect(state => ({
      rule: state.rule,
      role: "shippingSpace",
      data: state._warehouse.shippingSpaceList,
      metaInfo: state._warehouse.shippingSpaceListMetaInfo,
      count: state._warehouse.shippingSpaceCount,
      currentPage: state._warehouse.shippingSpaceCurrentPageNumber,
      searchFormParameters: state._warehouse.shippingSpaceSearchFormParameters,
      loading: state._warehouse.loading,
      owner: { type: '_warehouse', id: state._warehouse.id, referenceName: 'warehouse', listName: 'shippingSpaceList', ref:state._warehouse, listDisplayName: appLocaleName(userContext,"List")}, // this is for model namespace and
    }))(ShippingSpaceCreateForm)
  }
  
  getShippingSpaceUpdateForm = () => {
    const userContext = null
  	const {ShippingSpaceUpdateForm} = GlobalComponents;
    return connect(state => ({
      selectedRows: state._warehouse.selectedRows,
      role: "shippingSpace",
      currentUpdateIndex: state._warehouse.currentUpdateIndex,
      owner: { type: '_warehouse', id: state._warehouse.id, listName: 'shippingSpaceList', ref:state._warehouse, listDisplayName: appLocaleName(userContext,"List") }, // this is for model namespace and
    }))(ShippingSpaceUpdateForm)
  }

  getDamageSpaceSearch = () => {
    const {DamageSpaceSearch} = GlobalComponents;
    const userContext = null
    return connect(state => ({
      rule: state.rule,
      name: "Damage Space",
      role: "damageSpace",
      data: state._warehouse.damageSpaceList,
      metaInfo: state._warehouse.damageSpaceListMetaInfo,
      count: state._warehouse.damageSpaceCount,
      currentPage: state._warehouse.damageSpaceCurrentPageNumber,
      searchFormParameters: state._warehouse.damageSpaceSearchFormParameters,
      searchParameters: {...state._warehouse.searchParameters},
      expandForm: state._warehouse.expandForm,
      loading: state._warehouse.loading,
      partialList: state._warehouse.partialList,
      owner: { type: '_warehouse', id: state._warehouse.id, 
      referenceName: 'warehouse', 
      listName: 'damageSpaceList', ref:state._warehouse, 
      listDisplayName: appLocaleName(userContext,"List") }, // this is for model namespace and
    }))(DamageSpaceSearch)
  }
  getDamageSpaceCreateForm = () => {
   	const {DamageSpaceCreateForm} = GlobalComponents;
   	const userContext = null
    return connect(state => ({
      rule: state.rule,
      role: "damageSpace",
      data: state._warehouse.damageSpaceList,
      metaInfo: state._warehouse.damageSpaceListMetaInfo,
      count: state._warehouse.damageSpaceCount,
      currentPage: state._warehouse.damageSpaceCurrentPageNumber,
      searchFormParameters: state._warehouse.damageSpaceSearchFormParameters,
      loading: state._warehouse.loading,
      owner: { type: '_warehouse', id: state._warehouse.id, referenceName: 'warehouse', listName: 'damageSpaceList', ref:state._warehouse, listDisplayName: appLocaleName(userContext,"List")}, // this is for model namespace and
    }))(DamageSpaceCreateForm)
  }
  
  getDamageSpaceUpdateForm = () => {
    const userContext = null
  	const {DamageSpaceUpdateForm} = GlobalComponents;
    return connect(state => ({
      selectedRows: state._warehouse.selectedRows,
      role: "damageSpace",
      currentUpdateIndex: state._warehouse.currentUpdateIndex,
      owner: { type: '_warehouse', id: state._warehouse.id, listName: 'damageSpaceList', ref:state._warehouse, listDisplayName: appLocaleName(userContext,"List") }, // this is for model namespace and
    }))(DamageSpaceUpdateForm)
  }

  getWarehouseAssetSearch = () => {
    const {WarehouseAssetSearch} = GlobalComponents;
    const userContext = null
    return connect(state => ({
      rule: state.rule,
      name: "Warehouse Asset",
      role: "warehouseAsset",
      data: state._warehouse.warehouseAssetList,
      metaInfo: state._warehouse.warehouseAssetListMetaInfo,
      count: state._warehouse.warehouseAssetCount,
      currentPage: state._warehouse.warehouseAssetCurrentPageNumber,
      searchFormParameters: state._warehouse.warehouseAssetSearchFormParameters,
      searchParameters: {...state._warehouse.searchParameters},
      expandForm: state._warehouse.expandForm,
      loading: state._warehouse.loading,
      partialList: state._warehouse.partialList,
      owner: { type: '_warehouse', id: state._warehouse.id, 
      referenceName: 'owner', 
      listName: 'warehouseAssetList', ref:state._warehouse, 
      listDisplayName: appLocaleName(userContext,"List") }, // this is for model namespace and
    }))(WarehouseAssetSearch)
  }
  getWarehouseAssetCreateForm = () => {
   	const {WarehouseAssetCreateForm} = GlobalComponents;
   	const userContext = null
    return connect(state => ({
      rule: state.rule,
      role: "warehouseAsset",
      data: state._warehouse.warehouseAssetList,
      metaInfo: state._warehouse.warehouseAssetListMetaInfo,
      count: state._warehouse.warehouseAssetCount,
      currentPage: state._warehouse.warehouseAssetCurrentPageNumber,
      searchFormParameters: state._warehouse.warehouseAssetSearchFormParameters,
      loading: state._warehouse.loading,
      owner: { type: '_warehouse', id: state._warehouse.id, referenceName: 'owner', listName: 'warehouseAssetList', ref:state._warehouse, listDisplayName: appLocaleName(userContext,"List")}, // this is for model namespace and
    }))(WarehouseAssetCreateForm)
  }
  
  getWarehouseAssetUpdateForm = () => {
    const userContext = null
  	const {WarehouseAssetUpdateForm} = GlobalComponents;
    return connect(state => ({
      selectedRows: state._warehouse.selectedRows,
      role: "warehouseAsset",
      currentUpdateIndex: state._warehouse.currentUpdateIndex,
      owner: { type: '_warehouse', id: state._warehouse.id, listName: 'warehouseAssetList', ref:state._warehouse, listDisplayName: appLocaleName(userContext,"List") }, // this is for model namespace and
    }))(WarehouseAssetUpdateForm)
  }


  
  buildRouters = () =>{
  	const {WarehouseDashboard} = GlobalComponents
  	const {WarehousePermission} = GlobalComponents
  	const {WarehouseProfile} = GlobalComponents
  	
  	
  	const routers=[
  	{path:"/warehouse/:id/dashboard", component: WarehouseDashboard},
  	{path:"/warehouse/:id/profile", component: WarehouseProfile},
  	{path:"/warehouse/:id/permission", component: WarehousePermission},
  	
  	
  	
  	{path:"/warehouse/:id/list/storageSpaceList", component: this.getStorageSpaceSearch()},
  	{path:"/warehouse/:id/list/storageSpaceCreateForm", component: this.getStorageSpaceCreateForm()},
  	{path:"/warehouse/:id/list/storageSpaceUpdateForm", component: this.getStorageSpaceUpdateForm()},
   	
  	{path:"/warehouse/:id/list/smartPalletList", component: this.getSmartPalletSearch()},
  	{path:"/warehouse/:id/list/smartPalletCreateForm", component: this.getSmartPalletCreateForm()},
  	{path:"/warehouse/:id/list/smartPalletUpdateForm", component: this.getSmartPalletUpdateForm()},
   	
  	{path:"/warehouse/:id/list/supplierSpaceList", component: this.getSupplierSpaceSearch()},
  	{path:"/warehouse/:id/list/supplierSpaceCreateForm", component: this.getSupplierSpaceCreateForm()},
  	{path:"/warehouse/:id/list/supplierSpaceUpdateForm", component: this.getSupplierSpaceUpdateForm()},
   	
  	{path:"/warehouse/:id/list/receivingSpaceList", component: this.getReceivingSpaceSearch()},
  	{path:"/warehouse/:id/list/receivingSpaceCreateForm", component: this.getReceivingSpaceCreateForm()},
  	{path:"/warehouse/:id/list/receivingSpaceUpdateForm", component: this.getReceivingSpaceUpdateForm()},
   	
  	{path:"/warehouse/:id/list/shippingSpaceList", component: this.getShippingSpaceSearch()},
  	{path:"/warehouse/:id/list/shippingSpaceCreateForm", component: this.getShippingSpaceCreateForm()},
  	{path:"/warehouse/:id/list/shippingSpaceUpdateForm", component: this.getShippingSpaceUpdateForm()},
   	
  	{path:"/warehouse/:id/list/damageSpaceList", component: this.getDamageSpaceSearch()},
  	{path:"/warehouse/:id/list/damageSpaceCreateForm", component: this.getDamageSpaceCreateForm()},
  	{path:"/warehouse/:id/list/damageSpaceUpdateForm", component: this.getDamageSpaceUpdateForm()},
   	
  	{path:"/warehouse/:id/list/warehouseAssetList", component: this.getWarehouseAssetSearch()},
  	{path:"/warehouse/:id/list/warehouseAssetCreateForm", component: this.getWarehouseAssetCreateForm()},
  	{path:"/warehouse/:id/list/warehouseAssetUpdateForm", component: this.getWarehouseAssetUpdateForm()},
     	
  	
  	]
  	
  	const {extraRoutesFunc} = this.props;
	const extraRoutes = extraRoutesFunc?extraRoutesFunc():[]
    const finalRoutes = routers.concat(extraRoutes)
    
  	return (<Switch>
             {finalRoutes.map((item)=>(<Route key={item.path} path={item.path} component={item.component} />))}    
  	  	</Switch>)
  	
  
  }
 

  getPageTitle = () => {
    // const { location } = this.props
    // const { pathname } = location
    const title = '双链小超全流程供应链系统'
    return title
  }
 
  handleOpenChange = (openKeys) => {
    const latestOpenKey = openKeys.find(key => this.state.openKeys.indexOf(key) === -1)
    this.setState({
      openKeys: latestOpenKey ? [latestOpenKey] : [],
    })
  }
   toggle = () => {
     const { collapsed } = this.props
     this.props.dispatch({
       type: 'global/changeLayoutCollapsed',
       payload: !collapsed,
     })
   }
    logout = () => {
   
    console.log("log out called")
    this.props.dispatch({ type: 'launcher/signOut' })
  }
   render() {
     // const { collapsed, fetchingNotices,loading } = this.props
     const { collapsed } = this.props
     
  
     const targetApp = sessionObject('targetApp')
     const currentBreadcrumb =targetApp?sessionObject(targetApp.id):[];
     const userContext = null
     const renderBreadcrumbText=(value)=>{
     	if(value==null){
     		return "..."
     	}
     	if(value.length < 10){
     		return value
     	}
     
     	return value.substring(0,10)+"..."
     	
     	
     }
     const menuProps = collapsed ? {} : {
       openKeys: this.state.openKeys,
     }
     const layout = (
     <Layout>
        <Header>
          
          <div className={styles.left}>
          <img
            src="./favicon.png"
            alt="logo"
            onClick={this.toggle}
            className={styles.logo}
          /><Link key={"__home"} to={"/home"} className={styles.breadcrumbLink}><Icon type="home" />&nbsp;{appLocaleName(userContext,"Home")}</Link>
          {currentBreadcrumb.map((item)=>{
            return (<Link  key={item.link} to={`${item.link}`} className={styles.breadcrumbLink}><Icon type="caret-right" />{renderBreadcrumbText(item.name)}</Link>)

          })}
         </div>
          <div className={styles.right}  >
          <Button type="primary"  icon="logout" onClick={()=>this.logout()}>
          {appLocaleName(userContext,"Exit")}</Button>
          </div>
          
        </Header>
       <Layout>
         <Sider
           trigger={null}
           collapsible
           collapsed={collapsed}
           breakpoint="md"
           onCollapse={()=>this.onCollapse(collapsed)}
           collapsedWidth={56}
           className={styles.sider}
         >

		 {this.getNavMenuItems(this.props.warehouse)}
		 
         </Sider>
         <Layout>
           <Content style={{ margin: '24px 24px 0', height: '100%' }}>
           
           {this.buildRouters()}
 
             
             
           </Content>
          </Layout>
        </Layout>
      </Layout>
     )
     return (
       <DocumentTitle title={this.getPageTitle()}>
         <ContainerQuery query={query}>
           {params => <div className={classNames(params)}>{layout}</div>}
         </ContainerQuery>
       </DocumentTitle>
     )
   }
}

export default connect(state => ({
  collapsed: state.global.collapsed,
  fetchingNotices: state.global.fetchingNotices,
  notices: state.global.notices,
  warehouse: state._warehouse,
  ...state,
}))(WarehouseBizApp)



