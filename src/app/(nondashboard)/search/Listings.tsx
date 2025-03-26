import Card from "@/components/Card";
import CardCompact from "@/components/CardCompact";
import { useGetAuth } from "@/queries/auth.query";
import { useGetPropertiesQuery } from "@/queries/property.query";
import {
  useAddFavoritePropertyMutation,
  useRemoveFavoritePropertyMutation,
} from "@/queries/tenant.query";
import { useGlobalStore } from "@/store/global.store";
import { Property } from "@/types/prismaTypes";
import React from "react";

const Listings = () => {
  const { data: authUser } = useGetAuth();
  const { mutateAsync: addFavoriteProperty } = useAddFavoritePropertyMutation();
  const { mutateAsync: removeFavoriteProperty } =
    useRemoveFavoritePropertyMutation();
  const viewMode = useGlobalStore((state) => state.viewMode);
  const filters = useGlobalStore((state) => state.filters);

  const {
    data: properties,
    isLoading,
    isError,
  } = useGetPropertiesQuery(filters);
  console.log({ properties });

  const handleFavoriteToggle = async (propertyId: number) => {
    if (!authUser) return;

    const isFavorite = authUser.data?.userInfo.favorites.some(
      (fav: Property) => fav.id === propertyId
    );

    if (isFavorite) {
      await removeFavoriteProperty({
        cognitoId: authUser.data?.cognitoInfo.userId,
        propertyId,
      });
    } else {
      await addFavoriteProperty({
        cognitoId: authUser.data?.cognitoInfo.userId,
        propertyId,
      });
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError || !properties) return <div>Failed to fetch properties</div>;

  return (
    <div className="w-full">
      <h3 className="text-sm font-bold px-4">
        {properties.length}{" "}
        <span className="text-gray-700 font-normal">
          Places in {filters.location}
        </span>
      </h3>
      <div className="flex">
        <div className="p-4 w-full">
          {properties.map((property) =>
            viewMode === "grid" ? (
              <Card
                key={property.id}
                property={property}
                isFavorite={
                  authUser?.data?.userInfo?.favorites?.some(
                    (fav: Property) => fav.id === property.id
                  ) || false
                }
                onFavoriteToggle={() => handleFavoriteToggle(property.id)}
                showFavoriteButton={!!authUser?.data}
                propertyLink={`/search/${property.id}`}
              />
            ) : (
              <CardCompact
                key={property.id}
                property={property}
                isFavorite={
                  authUser?.data?.userInfo?.favorites?.some(
                    (fav: Property) => fav.id === property.id
                  ) || false
                }
                onFavoriteToggle={() => handleFavoriteToggle(property.id)}
                showFavoriteButton={!!authUser?.data}
                propertyLink={`/search/${property.id}`}
              />
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default Listings;
