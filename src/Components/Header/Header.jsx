import { HomeFilled } from "@ant-design/icons";
import { Menu } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();

  const onClickMenu = (item) => {
    navigate(`/${item.key}`);
  };

  return (
    <div className="AppHeader">
      <Menu
        onClick={onClickMenu}
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
                label: "Men's Watch",
                key: "mens-watch",
              },
              {
                label: "Men's Shoes",
                key: "mens-shoes",
              },
            ],
          },
          {
            label: "Women",
            key: "women",
            children: [
              {
                label: "Women's Shirts",
                key: "womens-shirts",
              },
              {
                label: "Women's Watch",
                key: "womens-watch",
              },
              {
                label: "Women's Shoes",
                key: "womens-shoes",
              },
            ],
          },
          {
            label: "Accessories",
            key: "accessories",
          },
        ]}
      />
    </div>
  );
}

export default Header;
