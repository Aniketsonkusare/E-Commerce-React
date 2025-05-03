import { HomeFilled, ShoppingCartOutlined } from "@ant-design/icons";
import {
  Badge,
  Button,
  Checkbox,
  Drawer,
  Form,
  Input,
  InputNumber,
  Menu,
  message,
  Table,
  Typography,
} from "antd";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCart } from "../../API/Api";

function Header() {
  const navigate = useNavigate();

  const changeRoutes = (items) => {
    navigate(`/${items?.key}`);
  };

  return (
    <div className="AppHeader">
      <Menu
      className="AppHeaderMenu"
        onClick={changeRoutes}
        mode="horizontal"
        items={[
          {
            label: <HomeFilled />,
            key: "",
          },
          {
            label: "Men",
            key: "men",
            children: [
              {
                label: "Men's Shirts",
                key: "mens-shirts",
              },
              {
                label: "Men's Shoes",
                key: "mens-shoes",
              },
              {
                label: "Men's Watches",
                key: "mens-watches",
              },
            ],
          },
          {
            label: "Women",
            key: "women",
            children: [
              {
                label: "Women's Dresses",
                key: "womens-dresses",
              },
              {
                label: "Women's Shoes",
                key: "womens-shoes",
              },
              {
                label: "Women's Watches",
                key: "womens-watches",
              },
              {
                label: "Women's Bags",
                key: "womens-bags",
              },
              {
                label: "Women's Jewellery",
                key: "womens-jewellery",
              },
            ],
          },
          {
            label: "Fragrances",
            key: "fragrances",
          },
        ]}
      />
      <Typography.Title>Store</Typography.Title>
      <AppCart />
    </div>
  );
}

const AppCart = () => {
  const [openDrawer, setOpenDrawer] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [checkoutDrawer, setCheckoutDrawer] = useState(false);

  const onConfirmOrder = (value) => {
    console.log("Confirm Order", { value });
    setCheckoutDrawer(false);
    setOpenDrawer(false);
    message.success("Order Confirmed Successfully");
  };

  useEffect(() => {
    const fetchCardItems = async () => {
      try {
        const res = await getCart();
        setCartItems(res?.products);
      } catch (error) {
        console.error("Error fetching cart items:", error);
      }
    };
    fetchCardItems();
  }, []);

  return (
    <div className="AppCart">
      <Badge count={cartItems.length} className="shoppingCartIcon">
        <ShoppingCartOutlined onClick={() => setOpenDrawer(true)} />
      </Badge>
      <Drawer
        width={550}
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
        title="Shopping Cart"
        placement="right"
        dataSource={cartItems}
      >
        <Table
          pagination={false}
          columns={[
            {
              label: "Title",
              dataIndex: "title",
            },
            {
              label: "Price",
              dataIndex: "price",
              render: (text) => <span>${text?.toFixed(3)}</span>,
            },
            {
              label: "Quantity",
              dataIndex: "quantity",
              render: (text, record) => {
                return (
                  <InputNumber
                    min={0}
                    defaultValue={text}
                    onChange={(value) => {
                      setCartItems((cart) => {
                        return cart?.map((items) => {
                          if (items.id === record.id) {
                            items.total = items?.price * value;
                          }
                          return items;
                        });
                      });
                    }}
                  ></InputNumber>
                );
              },
            },
            {
              label: "Total Price",
              dataIndex: "total",
              render: (text) => <span>${text?.toFixed(3)}</span>,
            },
          ]}
          dataSource={cartItems}
          summary={(data) => {
            const totalData = data?.reduce((prev, current) => {
              return prev + current?.total;
            }, 0);
            return (
              <Table.Summary.Row>
                <Table.Summary.Cell colSpan={3}>
                  <Typography.Text strong>Total</Typography.Text>
                </Table.Summary.Cell>
                <Table.Summary.Cell colSpan={1}>
                  <Typography.Text strong>
                    ${totalData?.toFixed(2)}
                  </Typography.Text>
                </Table.Summary.Cell>
              </Table.Summary.Row>
            );
          }}
        ></Table>
        <Button type="primary" onClick={() => setCheckoutDrawer(true)}>
          Check Out Drawer
        </Button>
      </Drawer>
      <Drawer
        title={"Confirm Order"}
        open={checkoutDrawer}
        onClose={() => setCheckoutDrawer(false)}
        destroyOnClose={true}
      >
        <Form onFinish={onConfirmOrder}>
          <Form.Item
            rules={[{ required: true, message: "Please Enter Your Full Name" }]}
            label="Full Name"
            name="full_name"
          >
            <Input placeholder="Enter Your Full Name..." />
          </Form.Item>
          <Form.Item
            rules={[
              {
                required: true,
                type: "email",
                message: "Please Enter Valid Email",
              },
            ]}
            label="Email"
            name="your_email"
          >
            <Input placeholder="Enter Your Email..." />
          </Form.Item>
          <Form.Item
            rules={[{ required: true, message: "Please Enter Your Full Name" }]}
            label="Address"
            name="address"
          >
            <Input placeholder="Enter Your Address..." />
          </Form.Item>
          <Form.Item>
            <Checkbox defaultChecked disabled>
              Cash On Delivery
            </Checkbox>
          </Form.Item>
          <Typography.Paragraph type="secondary">Thanks For The Order</Typography.Paragraph>
          <Button htmlType="submit" type="primary">
            Confirm Order
          </Button>
        </Form>
      </Drawer>
    </div>
  );
};

export default Header;
