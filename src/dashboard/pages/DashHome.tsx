import { SectionCards } from "../../components/section-cards";
import { ChartAreaInteractive } from "../../components/chart-area-interactive";
import { DataTable } from "../../components/data-table";
import data from "../layout/data.json";

const DashHome = () => {
  return (
    <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6  bg-gradient-to-br from-red-50 to-rose-100 rounded-2xl ">
      <SectionCards />
      <div className="px-4 lg:px-6">
        <ChartAreaInteractive />
      </div>
      <DataTable data={data} />
    </div>
  );
};

export default DashHome;
