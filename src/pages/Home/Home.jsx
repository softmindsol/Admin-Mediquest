import React from "react";
import Breadcrumb from "../../components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "../../layouts/DefaultLayout";
import { Link } from "react-router-dom";
import RecentTests from "../../components/RecentTests";
import Progress from "../../components/Progress";



const Home = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Welcome home!" />
      <div className="flex justify-end mb-8 gap-5">
        <Link to="/subscription">
          <button className="bg-[#3A57E8] font-semibold text-title-p text-white py-[10px] px-8 rounded-[6px]">
            Get Full Subscription
          </button>
        </Link>
        <Link>
          <button className="bg-[#3A57E8] font-semibold text-title-p text-white py-[10px] px-8 rounded-[6px]">
            Create Quiz
          </button>
        </Link>
      </div>
      <RecentTests />
      <Progress />
    </DefaultLayout >
  );
};

export default Home;
