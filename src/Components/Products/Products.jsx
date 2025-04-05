import React, { useEffect, useState } from "react";
import { ApiPage } from "../../API/Api";
import { Card, Image, List, Typography } from "antd";

function Products() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    ApiPage().then((res) => {
      setItems(res?.products);
    });
  }, []);

  return (
    <div>
      <List
        grid={{ column: 3 }}
        renderItem={(products, index) => {
          return (
            <Card
              title={products?.title}
              key={index}
              cover={
                <Image className="itemCardImage" src={products.thumbnail} />
              }
            >
              <Card.Meta
                title={
                  <Typography.Paragraph>
                    Price: ${products?.price}{" "}
                    <Typography.Text delete type="danger">
                      $
                      {products?.price +
                        (products?.price * products?.discountPercentage) / 100}
                    </Typography.Text>
                  </Typography.Paragraph>
                }
              ></Card.Meta>
            </Card>
          );
        }}
        dataSource={items}
      ></List>
    </div>
  );
}

export default Products;
