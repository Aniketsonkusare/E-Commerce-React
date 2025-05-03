// import React, { useEffect, useState } from "react";
// import { ApiPage, addToCard,getProductsByCategory } from "../../API/Api";
// import {
//   Badge,
//   Button,
//   Card,
//   Image,
//   List,
//   message,
//   Rate,
//   Spin,
//   Typography,
// } from "antd";
// import "@ant-design/v5-patch-for-react-19";
// import { useParams } from "react-router-dom";

// function Products() {
//   const params = useParams()
//   console.log(params?.categoryId,"params")
//   const [items, setItems] = useState([]);
//   const [loading, setLoading] = useState(true);
//   useEffect(() => {
//     getProductsByCategory(params?.categoryId).then((res) => {
//       setItems(res?.products);
//       setLoading(false);
//       console.log(res?.products,"adasdsa")
//     });
//   }, [params]);

//   return (
//     <Spin spinning={loading}>
//       <List
//         grid={{ column: 3 }}
//         renderItem={(products, index) => {
//           console.log(products,";dslkfjsdl;fjsdalfjsdlfk")
//           return (
//             <Badge.Ribbon
//               className="itemCardBadge"
//               color="red"
//               text={products?.discountPercentage}
//             >
//               <Card
//                 className="itemCard"
//                 title={products?.title}
//                 key={index}
//                 cover={
//                   <Image className="itemCardImage" src={products.thumbnail} />
//                 }
//                 actions={[
//                   <Rate disabled allowHalf value={products?.rating}></Rate>,
//                   <AddToCardAdd items={products} />,
//                 ]}
//               >
//                 <Card.Meta
//                   title={
//                     <Typography.Paragraph>
//                       Price: ${products?.price}{" "}
//                       <Typography.Text delete type="danger">
//                         $
//                         {(
//                           products?.price +
//                           (products?.price * products?.discountPercentage) / 100
//                         )?.toFixed(3)}
//                       </Typography.Text>
//                     </Typography.Paragraph>
//                   }
//                   description={
//                     <Typography.Paragraph
//                       ellipsis={{ rows: 2, expandable: true, symbol: "more" }}
//                     >
//                       {products?.description}
//                     </Typography.Paragraph>
//                   }
//                 ></Card.Meta>
//               </Card>
//             </Badge.Ribbon>
//           );
//         }}
//         dataSource={items}
//       ></List>
//     </Spin>
//   );
// }

// const AddToCardAdd = ({ items }) => {
//   const [loading, setLoading] = useState(false);
//   const addProductToCart = (id) => {
//     setLoading(true);
//     addToCard(items.id)?.then((res) => {
//       message.success(`${items?.title} Products has been added`);
//     });
//     setLoading(false);
//   };

//   return (
//     <Button loading={loading} onClick={addProductToCart} type="link">
//       Add To Card
//     </Button>
//   );
// };

// export default Products;

import {
  Badge,
  Button,
  Card,
  Image,
  List,
  message,
  Rate,
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
  const params = useParams();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      const res = params?.categoryID
        ? await getProductsByCategory(params?.categoryID)
        : await allProducts();
        setItems(res?.products)
        setLoading(false)
    };
    fetchData();
  }, [params]);

  if (loading) {
    return <Spin spinning></Spin>;
  }

  return (
    <div>
      <List
        grid={{ column: 3 }}
        renderItem={(products, key) => {
          return (
            <Badge.Ribbon
              className="itemCardBadge"
              color="red"
              text={products?.discountPercentage}
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
        dataSource={items}
      ></List>
    </div>
  );
}

const AddToCartProducts = ({ item }) => {
  const addProducts = () => {
    addToCart(item?.id)?.then((res) => {
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
