import {
  Badge,
  Button,
  Card,
  Image,
  List,
  message,
  Rate,
  Select,
  Spin,
  Typography,
} from "antd";
import React, { useEffect, useState } from "react";
import { allProducts, addToCart, getProductsByCategory } from "../../API/Api";
import "@ant-design/v5-patch-for-react-19";
import { useParams } from "react-router-dom";

function Products() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [sortedOrder, setSortedOrder] = useState("az");
  const params = useParams();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = params?.categoryID
          ? await getProductsByCategory(params?.categoryID)
          : await allProducts();
        setItems(res?.products);
      } catch (error) {
        console.error("Error fetching products:", error);
        message.error("Failed to fetch products. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [params?.categoryID]);

  const getSortedItems = () => {
    let sortedItems = [...items];
    sortedItems.sort((a, b) => {
      const aTitle = a.title.toLowerCase();
      const bTitle = b.title.toLowerCase();
      if (sortedOrder === "az") {
        return aTitle > bTitle ? 1 : aTitle === bTitle ? 0 : -1;
      } else if (sortedOrder === "za") {
        return aTitle < bTitle ? 1 : aTitle === bTitle ? 0 : -1;
      } else if (sortedOrder === "low") {
        return a.price > b.price ? 1 : a.price === b.price ? 0 : -1;
      } else if (sortedOrder === "high") {
        return a.price < b.price ? 1 : a.price === b.price ? 0 : -1;
      }
    });
    return sortedItems;
  };

  if (loading) {
    return (
      <div className="centeredSpinner">
        <Spin spinning />
      </div>
    );
  }

  return (
    <div className="productsContainer">
      <div>
        <Typography.Text style={{ fontSize: "18px" }}>
          View Item Sorted By:{" "}
        </Typography.Text>
        <Select
          onChange={(value) => setSortedOrder(value)}
          defaultValue={"az"}
          options={[
            { label: "Alphabetacally a-z", value: "az" },
            { label: "Alphabetacally z-a", value: "za" },
            { label: "Price low to high", value: "low" },
            { label: "Price high to low", value: "high" },
          ]}
        ></Select>
      </div>
      <List
        grid={{ column: 3 }}
        renderItem={(products, key) => {
          return (
            <Badge.Ribbon
              className="itemCardBadge"
              color="red"
              text={`${products?.discountPercentage}% Off`}
            >
              <Card
                className="itemCard"
                key={key}
                title={products?.title}
                cover={
                  <Image
                    className="itemCardImage"
                    src={products?.thumbnail}
                  ></Image>
                }
                actions={[
                  <Rate disabled allowHalf value={products?.rating}></Rate>,
                  <AddToCartProducts item={products} />,
                ]}
              >
                <Card.Meta
                  title={
                    <Typography.Paragraph>
                      Price: {products?.price}{" "}
                      <Typography.Text type="danger" delete>
                        {(
                          products?.price +
                          (products?.price * products?.discountPercentage) / 100
                        )?.toFixed(3)}
                      </Typography.Text>
                    </Typography.Paragraph>
                  }
                  description={
                    <Typography.Paragraph
                      ellipsis={{ rows: 2, expandable: true, symbol: "more" }}
                    >
                      {products?.description}
                    </Typography.Paragraph>
                  }
                ></Card.Meta>
              </Card>
            </Badge.Ribbon>
          );
        }}
        dataSource={getSortedItems()}
      ></List>
    </div>
  );
}

const AddToCartProducts = ({ item }) => {
  const addProducts = () => {
    addToCart(item?.id)?.then(() => {
      message.success(`${item?.title} has been added Successfully`);
    });
  };

  return (
    <>
      <Button onClick={addProducts} type="link">
        Add To Cart
      </Button>
    </>
  );
};

export default Products;
