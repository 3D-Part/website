"use client";
import Heading2 from "@/components/common/text/heading/Heading2";
import Paragraph from "@/components/common/text/paragraph/Paragraph";
import ContactUsButton from "./ContactUsButton";

const ContactUsText = () => {
  return (
    <div
      className="md:w-1/2"
      // initial="hidden"
      // whileInView="visible"
      // viewport={{ once: true }}
      // transition={{ duration: 0.5, delay: 0.5 }}
      // variants={{
      //   visible: { opacity: 1, x: 0 },
      //   hidden: { opacity: 0, x: 100 },
      // }}
    >
      <Heading2 className="mb-6">Povežite se sa 3D Part timom</Heading2>
      <Paragraph size="M" weight="Regular">
        3D Part je vaš izbor za sve vrste 3D printanih dijelova i pribora! Naš
        je cilj pružiti vam{" "}
        <span className="font-bold">iznimnu kvalitetu proizvoda i usluga</span>,
        kako bismo zadovoljili sve vaše potrebe u 3D printanju. Ako imate
        pitanja, prijedloge ili trebate tehničku podršku, naš stručni tim je
        uvijek spreman pomoći.
      </Paragraph>
      <br />
      <Paragraph size="M" weight="Regular">
        {" "}
        Slobodno nas kontaktirajte putem e-maila, telefona ili društvenih mreža,
        a mi ćemo vam se rado obratiti u najkraćem mogućem roku. Bez obzira na
        vaše potrebe, možete računati na našu podršku i stručnost.
      </Paragraph>
      <ContactUsButton />
    </div>
  );
};

export default ContactUsText;
