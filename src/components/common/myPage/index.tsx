import React, { useRef, FC, useState, useEffect } from 'react'
import { Button } from 'antd'
import MyTable from '@/components/common/table'
import { isAuthorized } from '@/assets/js/publicFunc'
import MyModal from '@/components/common/myModal'
import { onItemChange } from "@/utils/tableCommon";


interface PageProps {
  columns?: Object[]
  searchConfigList?: Object[]
  showAddBtn?: boolean
  showBatchDelBtn?: boolean
  showOpeation?: boolean
  permissionPrefix?: String
  apiFun?: (arg0?: unknown[]) => Promise<{}>
  addApiFun?: (arg0?: unknown[]) => Promise<{}>
  delApiFun?: (arg0?: unknown[]) => Promise<{}>
  editApiFun?: (arg0?: unknown[]) => Promise<{}>
}

const MyPage: FC<PageProps> = (

  (props: PageProps) => {
    const {
      columns,
      apiFun,
      searchConfigList,
      showAddBtn,
      showBatchDelBtn,
      showOpeation,
      permissionPrefix,
      addApiFun,
      delApiFun,
      editApiFun
    } = props

    const tableRef: RefType = useRef()
    const [open, setOpen] = useState(false);
    const [canEdit, setCanEdit] = useState(false);
    const [selectRow, setSelectRow] = useState(Object);
    const [selectKeys, setSelectKeys] = useState([]);
    const [key, setKey] = useState(String)
    const [tableColumns, setTabColumns] = useState([])

    useEffect(() => {
      if (showOpeation === false) {
        setTabColumns(columns)
      } else {
        const opera = {
          title: '操作',
          dataIndex: 'operations',
          align: 'center',
          editFlag: false,
          render: (text, record) => (
            <>
              {isAuthorized(permissionPrefix + ':edit') && (
                <Button className="btn" onClick={() => { doEdit(record) }} size="small">
                  编辑
                </Button>
              )}
              <Button className="btn" onClick={() => { doView(record) }} size="small">
                查看
              </Button>
              {isAuthorized(permissionPrefix + ':add') && (<Button className="btn" onClick={() => doDel(record)} size="small">
                删除
              </Button>)}
            </>
          )
        }
        var newColumns = [...columns, opera]
        setTabColumns(newColumns)

      }
    }, [columns, showOpeation, permissionPrefix])

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
      delApiFun(record)
      setKey((Math.random() * 10).toString())
    }

    const delBatch = () => {
      console.log(selectKeys)
    }

    const beforeOk = () => {
      var row = selectRow
      columns.forEach(e => {
        if (e["editType"] === "edit") {
          row[e["dataIndex"]] = selectRow[e["dataIndex"]].toHTML();
        }
      });
      return row;
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

    // 新增按钮
    const BatchDelBtn = () => (
      <Button className="fr" style={{ marginRight: "10px" }} onClick={delBatch} type="primary">
        删除
      </Button>
    )

    const onSelectRow = (rowKeys: string[]) => {
      setSelectKeys(rowKeys);
      console.log(selectKeys)
    }

    const handleOk = () => {
      var row = beforeOk();
      if (row["id"] === undefined) {
        addApiFun(row)
      } else {
        editApiFun(row)
      }
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
    return (<>
      {isAuthorized(permissionPrefix + ':add') && showAddBtn && <AddBtn />}
      {isAuthorized(permissionPrefix + ':del') && showBatchDelBtn && <BatchDelBtn />}
      <MyTable
        key={key}
        apiFun={apiFun}
        columns={tableColumns}
        ref={tableRef}
        onSelectRow={onSelectRow}
        searchConfigList={searchConfigList}
        extraProps={{ results: 10 }}
      />
      <MyModal title="aaaa" visible={open} onCancel={handCancle} onOk={handleOk} columns={columns}
        canEdit={canEdit} row={selectRow} onChange={onChange} />
    </>
    )
  })
MyPage.defaultProps = {
  columns: [],
  searchConfigList: [],
  showAddBtn: true,
  showBatchDelBtn: false,
  showOpeation: false,
  permissionPrefix: "",
}
export default MyPage
