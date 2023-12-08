/* eslint-disable react/jsx-no-target-blank */
import {useIntl} from 'react-intl'
import {SidebarMenuItem} from './SidebarMenuItem'
import {VAuth} from '../../../../../pages/auth/core/Auth'

const SidebarMenuMain = () => {
  const intl = useIntl()


  return (
    <>
      {/* <SidebarMenuItem
        to='/example'
        icon='/media/icons/duotune/art/art002.svg'
        title={'Example'}
        fontIcon='bi-app-indicator'
      /> */}

      <VAuth>
        <SidebarMenuItem
          to='/dashboard'
          icon='/media/icons/duotune/art/art002.svg'
          title={intl.formatMessage({id: 'MENU.DASHBOARD'})}
          fontIcon='bi-app-indicator'
        />
      </VAuth>
      {/* <SidebarMenuItem
        to='/builder'
        icon='/media/icons/duotune/general/gen019.svg'
        title='Layout Builder'
        fontIcon='bi-layers'
      /> */}
      <div className='menu-item'>
        <div className='menu-content pt-8 pb-2'>
          <span className='menu-section text-muted text-uppercase fs-8 ls-1'>Main</span>
        </div>
      </div>
      <div className='menu-item'>
        <div className='menu-content pt-8 pb-2'>
          <span className='menu-section text-muted text-uppercase fs-8 ls-1'>Setting</span>
        </div>
      </div>
      

        <SidebarMenuItem
          to='/songs'
          icon='/media/icons/duotune/coding/cod001.svg'
          title='Songs'
          fontIcon='bi-layers'
        />
      
      

        <SidebarMenuItem
          to='/genres'
          icon='/media/icons/duotune/communication/com006.svg'
          title='Genres'
          fontIcon='bi-layers'
        />
      
     

        <SidebarMenuItem
          to='/artists'
          icon='/media/icons/duotune/general/gen051.svg'
          title='Artists'
          fontIcon='bi-layers'
        />
      
      <VAuth>

        <SidebarMenuItem
          to='/user'
          icon='/media/icons/duotune/communication/com005.svg'
          title='User'
          fontIcon='bi-layers'
        />
      </VAuth>
      {/* <div className='menu-item'>
        <a
          target='_blank'
          className='menu-link'
          href={process.env.REACT_APP_PREVIEW_DOCS_URL + '/docs/changelog'}
        >
          <span className='menu-icon'>
            <KTSVG path='/media/icons/duotune/general/gen005.svg' className='svg-icon-2' />
          </span>
          <span className='menu-title'>Changelog {process.env.REACT_APP_VERSION}</span>
        </a>
      </div> */}
    </>
  )
}

export {SidebarMenuMain}
