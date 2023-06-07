import React, { FC } from 'react'
import { Input, } from 'antd'
import MySelect from '@/components/common/mySelect'
import commom from '@/api'
import MyPage from '@/components/common/myPage';

const NewUserList: FC = () => {
  // 搜索栏配置项
  const searchConfigList = [
    {
      key: 'name',
      slot: <Input placeholder="name" allowClear />,
      rules: [],
      initialValue: 'this is a demo🤓'
    },
    {
      key: 'gender',
      slot: (
        <MySelect
          data={[
            { name: 'male', key: 'male' },
            { name: 'female', key: 'female' }
          ]}
          placeholder="gender"
        />
      )
    }
  ]
  const preview = (url: string) => { }
  const columns = [
    {
      title: 'avatar',
      dataIndex: 'picture',
      editType: "upload",
      editFlag: true,
      render: (picture: CommonObjectType<string>) => (
        <span onClick={() => preview(picture.thumbnail)}>
          <img src={picture.thumbnail} width="40" alt="" />
        </span>
      ),
      width: '3%'
    },
    {
      title: 'name',
      dataIndex: 'name',
      editFlag: true,
      render: (name: CommonObjectType<string>) => `${name.first} ${name.last}`
    },
    {
      title: 'gender',
      dataIndex: 'gender',
      editType: "select",
      data: [
        { name: 'male', key: 'male' },
        { name: 'female', key: 'female' }
      ],
      editFlag: true
    },
    {
      title: 'edit',
      dataIndex: 'edit',
      editType: "edit",
      span: 6,
      sorter: true,
      editFlag: true
    }, {
      title: 'email',
      dataIndex: 'email',
      sorter: true,
      editFlag: true
    }
  ]
  return (
    <>
      <MyPage
        apiFun={commom.getList}
        columns={columns}
        permissionPrefix={"user:list"}
        addApiFun={commom.getList}
        editApiFun={commom.getList}
        delApiFun={commom.getList}
        showOpeation={true}
        showBatchDelBtn={true}
        searchConfigList={searchConfigList}
      />
    </>
  )
}
export default NewUserList
