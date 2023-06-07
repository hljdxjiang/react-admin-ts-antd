import React, { useRef, FC, useState } from 'react'
import { Button, Input, } from 'antd'
import MyTable from '@/components/common/table'
import { isAuthorized, previewImg } from '@/assets/js/publicFunc'
import MySelect from '@/components/common/mySelect'
import commom from '@/api'
import MyModal from '@/components/common/myModal'
import { onItemChange } from "@/utils/tableCommon";

const UserList: FC = () => {
  const tableRef: RefType = useRef()
  const [open, setOpen] = useState(false);
  const [canEdit, setCanEdit] = useState(false);
  const [selectRow, setSelectRow] = useState(Object);
  const [selectKeys, setSelectKeys] = useState([]);
  const [key, setKey] = useState(String)


  // 添加
  const add = () => {
    setOpen(true)
    setCanEdit(true)
    setSelectRow({});
  }
  // 编辑
  const doEdit = (record) => {
    setSelectRow(record)
    setOpen(true)
    setCanEdit(true)
  }
  // 查看
  const doView = (record) => {
    setSelectRow(record)
    setOpen(true)
    setCanEdit(false)
  }
  const doDel = (record) => {
    setKey((Math.random() * 10).toString())
  }

  const onChange = (e, stype?, sid?) => {
    var newRow = onItemChange(selectRow, e, stype, sid);
    setSelectRow(newRow)
  }

  // 新增按钮
  const AddBtn = () => (
    <Button className="fr" onClick={add} type="primary">
      新增
    </Button>
  )

  const onSelectRow = (rowKeys: string[]) => {
    setSelectKeys(rowKeys);
    console.log(selectKeys)
  }

  const handleOk = () => {
    var row = selectRow;
    row["edit"] = selectRow["edit"].toHTML();
    setSelectRow({});
    setCanEdit(false)
    setOpen(false)
    setKey((Math.random() * 10).toString())
  }

  const handCancle = () => {
    setSelectRow({});
    setCanEdit(false)
    setOpen(false)
  }
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
  const preview = (url: string) =>
    previewImg(<img src={url} width="100%" alt="" />)
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
      rules: [
        {
          required: true,
          message: '请选择性别'
        }
      ],
      render: (name: CommonObjectType<string>) => `${name.first} ${name.last}`
    },
    {
      title: 'gender',
      dataIndex: 'gender',
      editType: "select",
      rules: [
        {
          required: true,
          message: '请选择性别'
        }
      ],
      data: [
        { name: 'male', key: 'male' },
        { name: 'female', key: 'female' }
      ],
      editFlag: true
    },
    {
      title: 'edit',
      dataIndex: 'email',
      editType: "edit",
      span: 6,
      sorter: true,
      editFlag: true
    }, {
      title: 'email',
      dataIndex: 'email',
      sorter: true,
      rules: [
        {
          required: true,
          message: '请选择性别'
        }
      ],
      editFlag: true
    },
    {
      title: '操作',
      dataIndex: 'operations',
      align: 'center',
      editFlag: false,
      render: (text, record) => (
        <>
          {isAuthorized('user:list:edit') && (
            <Button className="btn" onClick={() => { doEdit(record) }} size="small">
              编辑
            </Button>
          )}
          <Button className="btn" onClick={() => { doView(record) }} size="small">
            查看
          </Button>
          {isAuthorized('user:list:add') && (<Button className="btn" onClick={() => doDel(record)} size="small">
            删除
          </Button>)}
        </>
      )
    }
  ]
  return (
    <>
      {isAuthorized('user:list:add') && <AddBtn />}
      <MyTable
        key={key}
        apiFun={commom.getList}
        columns={columns}
        ref={tableRef}
        onSelectRow={onSelectRow}
        searchConfigList={searchConfigList}
        extraProps={{ results: 10 }}
      />
      <MyModal title="aaaa" visible={open} onCancel={handCancle} onOk={handleOk} columns={columns}
        canEdit={canEdit} row={selectRow} onChange={onChange} />
    </>
  )
}
export default UserList
