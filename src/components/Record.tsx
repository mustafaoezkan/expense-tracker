import { useSelector, useDispatch } from "react-redux";
import { AppState } from "../store";
import {
  Table,
  Space,
  Tag,
  Button,
  Modal,
  Form,
  Input,
  Select,
  Col,
} from "antd";
import { Record, RecordForm } from "../types/record";
import React, { useEffect, useState } from "react";
import EditOutlined from "@ant-design/icons/lib/icons/EditOutlined";
import DeleteOutlined from "@ant-design/icons/lib/icons/DeleteOutlined";
import {
  getRecords,
  addRecord,
  updateRecord,
  deleteRecord,
} from "../store/actions/recordActions";
import { Category } from "../types/category";
import { Mode } from "../types/general";
import { getCategories } from "../store/actions/categoryActions";

const emptyForm: RecordForm = {
  title: "",
  amount: 0,
  category_id: 0,
};

function Records() {
  const { data, loading, error } = useSelector(
    (state: AppState) => state.records
  );

  const { data: categories } = useSelector(
    (state: AppState) => state.categories
  );

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [mode, setMode] = useState<Mode>("new");

  const showModal = (mode: Mode) => {
    setIsModalVisible(true);
    setMode(mode);
  };

  const handleOk = () => {
    if (mode === "new") dispatch(addRecord(form));
    else if (mode === "edit" && typeof updateId === "number")
      dispatch(updateRecord(form, updateId));
    else if (mode === "delete" && typeof deleteId === "number")
      dispatch(deleteRecord(deleteId));
    setIsModalVisible(false);
    setMode("new");
    setForm(emptyForm);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setMode("new");
    setForm(emptyForm);
    setUpdateId(null);
    setDeleteId(null);
  };

  const [form, setForm] = useState<RecordForm>(emptyForm);
  const [updateId, setUpdateId] = useState<number | null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      render: (amount: Record["amount"], record: Record) => {
        return (
          <React.Fragment>
            {Intl.NumberFormat("tr-TR", {
              style: "currency",
              currency: "TRY",
            }).format(amount)}
          </React.Fragment>
        );
      },
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      render: (category: Category, record: Record) => {
        return <Tag color={category.color}>{category.name.toUpperCase()}</Tag>;
      },
    },
    {
      title: "Last Update",
      dataIndex: "updatedAt",
      key: "updatedAt",
      render: (updatedAt: string, record: Record) => {
        const updatedAtObj = new Date(updatedAt);
        return (
          <React.Fragment>
            {updatedAtObj.toLocaleDateString()}{" "}
            {updatedAtObj.toLocaleTimeString("tr-TR", {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </React.Fragment>
        );
      },
    },
    {
      title: "Action",
      key: "action",
      render: (text: string, record: Record) => {
        const { title, amount } = record;
        const category_id = record.category.id;
        return (
          <Space size="middle">
            <EditOutlined
              style={{ color: "#0dba07" }}
              onClick={() => {
                showModal("edit");
                setForm({ title, amount, category_id });
                setUpdateId(record.id);
              }}
            />
            <DeleteOutlined
              style={{ color: "#ba0707" }}
              onClick={() => {
                showModal("delete");
                setDeleteId(record.id);
              }}
            />
          </Space>
        );
      },
    },
  ];
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getRecords());
    !categories.length && dispatch(getCategories());
  }, []);

  const isFormValid = !(
    !form.title ||
    form.amount === 0 ||
    form.category_id === 0
  );

  return (
    <React.Fragment>
      <Col span={24}>
        <div>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              marginBottom: "10px",
            }}
          >
            <Button type="primary" onClick={() => showModal("new")}>
              New Record
            </Button>
          </div>
          <Modal
            title={
              mode === "new"
                ? "Create new Record"
                : mode === "edit"
                ? "Update Record"
                : "Delete Record"
            }
            visible={isModalVisible}
            onOk={handleOk}
            onCancel={handleCancel}
            okButtonProps={{ disabled: !(mode === "delete") && !isFormValid }}
          >
            {mode === "edit" || mode === "new" ? (
              <Form labelCol={{ span: 8 }} wrapperCol={{ span: 16 }}>
                <Form.Item label="Title">
                  <Input
                    name="title"
                    value={form.title}
                    onChange={(e) =>
                      setForm({ ...form, title: e.target.value })
                    }
                  />
                </Form.Item>
                <Form.Item label="Amount">
                  <Input
                    name="amount"
                    value={form.amount}
                    onChange={(e) =>
                      setForm({ ...form, amount: Number(e.target.value) })
                    }
                  />
                </Form.Item>
                <Form.Item label="Category">
                  <Select
                    defaultValue={form.category_id}
                    value={form.category_id}
                    onChange={(category_id) =>
                      setForm({ ...form, category_id })
                    }
                  >
                    <Select.Option value={0} disabled>
                      Select a category
                    </Select.Option>
                    {categories.map((category) => {
                      return (
                        <Select.Option value={category.id} key={category.id}>
                          {category.name}
                        </Select.Option>
                      );
                    })}
                  </Select>
                </Form.Item>
              </Form>
            ) : mode === "delete" ? (
              <>Are you sure?</>
            ) : null}
          </Modal>
        </div>
        <Table
          loading={loading}
          columns={columns}
          dataSource={data}
          rowKey="id"
        />
      </Col>
    </React.Fragment>
  );
}

export default Records;
