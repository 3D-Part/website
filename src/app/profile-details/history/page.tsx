"use client";

import Container from "@/components/common/container/Container";
import Heading2 from "@/components/common/text/heading/Heading2";
import HistoryTable from "./HistoryTable";

const History = () => {

    return (
        <div className="w-full bg-neutral-900">
            <Container className="flex !max-w-auto flex-col items-center min-h-screen gap-8 py-6 bg-neutral-900 px-9 lg:items-start ">
                <Heading2>Istorija narudzbi</Heading2>

                <HistoryTable />
            </Container>
        </div>
    );
};

export default History;
