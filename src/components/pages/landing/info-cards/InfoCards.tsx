'use client'

import React from "react";
import InfoCard from "./info-card/InfoCard";
import Container from "@/components/common/container/Container";
import useSettingsApi from "@/redux/api/useSettingsApi";

const InfoCards = () => {
  const { settings } = useSettingsApi();

  return (
    <Container className="px-4 py-[60px] w-full flex flex-col gap-5 items-center lg:flex-row lg:px-9 lg:pt-[84px] lg:pb-[104px]">
      <InfoCard
        borderColor="rgba(34, 197, 94, 1)"
        circleColor="rgba(34, 197, 94, 0.2)"
        title="Besplatna dostava"
        subtitle={`Za narudžbe iznad ${settings.settings.delivery.freeDeliveryLimit}KM`}
        icon={0}
      />
      <InfoCard
        borderColor="rgba(53, 205, 253, 1)"
        circleColor="rgba(53, 205, 253, 0.2)"
        title="Brza dostava"
        subtitle="Dostava u roku od 24-48h"
        icon={1}
      />
      <InfoCard
        borderColor="rgba(128, 0, 255, 1)"
        circleColor="rgba(128, 0, 255, 0.2)"
        title="500+ proizvoda"
        subtitle="Raspolažemo sa preko 500 proizvoda"
        icon={2}
      />
      <InfoCard
        borderColor="rgba(255, 138, 52, 1)"
        circleColor="rgba(255, 138, 52, 0.2)"
        title="24/7 Podrška"
        subtitle="Dostupni u svako doba dana"
        icon={3}
      />
    </Container>
  );
};

export default InfoCards;
