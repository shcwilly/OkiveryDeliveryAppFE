import React, { useEffect, useState } from "react";
import Header from "@components/common/header/Header";
import FooterNavigationBar from "@components/common/footer/FooterNavigationBar";
import RestaurantCategory from "@components/home/category/RestaurantCategory";
import Banner from "@components/home/banner/Banner";
import AddressBar from "@components/address/AddressBar";
import apiRoutes from "../../api/apiRoutes";
import customAxios from "./../../api/axios";
import "./HomePage.css";
import { RestaurantType } from "../../types/restaurantTypes";
import { useLatLngStore } from "../../store/useLatLngStore";

export type BannerType = {
  name: string;
};

const HomePage: React.FC = () => {
  const banners: BannerType[] = [
    { name: "banner1" },
    { name: "banner2" },
    { name: "banner3" },
  ];

  const [restaurants, setRestaurants] = useState<RestaurantType[]>();
  const [categories, setCategories] = useState<{
    [key: string]: RestaurantType[];
  }>({});
  const [address, setAddress] = useState<string>("");
  // 레스토랑 리스트 get해오는 함수
  useEffect(() => {
    const getAddress = async () => {
      try {
        const response = await customAxios.get(apiRoutes.address);
        if (response.status === 200) {
          setAddress(response.data.base);
          if (response.data.base !== "") {
            try {
              const geocoder = new google.maps.Geocoder();
              geocoder.geocode(
                { address: address },
                (results: google.maps.GeocoderResult[] | null) => {
                  if (results !== null) {
                    const location = results[0].geometry.location;
                    const userLat = String(location.lat());
                    const userLng = String(location.lng());
                    // geocoding을 쓰지 않는 다른 컴포넌트에서 위도 경도 값을 사용할 수 있도록 전역
                    useLatLngStore.setState({ lat: userLat, lng: userLng });
                  }
                }
              );
            } catch (error) {
              console.error("Geocoding error: ", error);
            }
          }
        }
      } catch (error) {
        setAddress("Please click here and enter your address");
      }
    };
    const fetchRestaurants = async () => {
      try {
        const response = await customAxios.get(apiRoutes.restaurantList);
        if (response.status !== 200) throw new Error("예외가 발생했습니다.");
        setRestaurants(response.data);
      } catch (error) {
        console.error("Failed to fetch restaurants:", error);
      }
    };
    getAddress();
    fetchRestaurants();
  }, []);
  const { lat, lng } = useLatLngStore();
  console.log(lat, lng);

  // 레스토랑 리스트에서 카테고리만 추출 & 카테고리에 따라 재정렬
  useEffect(() => {
    if (restaurants !== undefined) {
      const extractCategories = () => {
        const categoriesSet = new Set<string>();

        restaurants.forEach((restaurant) => {
          restaurant.category.forEach((category) => {
            categoriesSet.add(category);
          });
        });

        const updatedCategories: { [key: string]: RestaurantType[] } = {};

        Array.from(categoriesSet).forEach((category) => {
          const categoryResWithOpeningStatus = restaurants.filter(
            (restaurant) => {
              return (
                restaurant.category.includes(category) &&
                restaurant.status === 1
              );
            }
          );

          const categoryResWithOtherStatus = restaurants.filter(
            (restaurant) => {
              return (
                restaurant.category.includes(category) &&
                restaurant.status !== 1
              );
            }
          );

          const categoryRes = categoryResWithOpeningStatus.concat(
            categoryResWithOtherStatus
          );

          updatedCategories[category] = categoryRes;
        });
        setCategories(updatedCategories);
      };
      extractCategories();
    }
  }, [restaurants]);

  return (
    <div>
      <Header
        hasBackIcon={false}
        title="Home"
        hasCartIcon={true}
        isFixed={true}
      />
      <AddressBar address={address} />
      <main className="mainContainer">
        <Banner banners={banners} />
        <div className="categoryList">
          {Object.keys(categories).map((categoryKey) => (
            <RestaurantCategory
              key={categoryKey}
              title={categoryKey}
              restaurants={categories[categoryKey]}
            />
          ))}
        </div>
      </main>
      <FooterNavigationBar page="Home" />
    </div>
  );
};

export default HomePage;
