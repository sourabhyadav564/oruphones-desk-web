import Image from "next/image";
import React, { useState } from "react";
import { useEffect } from "react";

function ComparisonTable(data) {
  console.log("data prod", data);
  const [productData, setProductData] = useState([]);
  useEffect(() => {
    if (data?.data?.length > 0) {
      const interval = setInterval(() => {
        setProductData(data?.data);
        console.log("productData", productData);
        clearInterval(interval);
      }, 1000);
    }
  }, []);

  return (
    <>
      <div class="relative pt-3 w-full">
        <table class="w-full text-mediumFontSize text-left text-gray-500 dark:text-gray-400">
          <thead class=" uppercase text-white dark:bg-gray-700 dark:text-gray-400 font-Roboto-Semibold">
            <tr>
              <th
                scope="col"
                class="px-6 py-3 bg-m-green-1 border-[1px] border-r-gray"
              >
                Seller
              </th>
              <th
                scope="col"
                class="px-6 py-3 bg-m-green-1 border-[1px] border-r-gray"
              >
                Price
              </th>
              <th
                scope="col"
                class="px-6 py-3 bg-m-green-1 border-[1px] border-r-gray text-center"
              >
                Brand Warranty
              </th>
              <th
                scope="col"
                class="px-6 py-3 bg-m-green-1 border-[1px] border-r-gray text-center"
              >
                Seller Warranty
              </th>
              <th
                scope="col"
                class="px-6 py-3 bg-m-green-1 border-[1px] border-r-gray text-center"
              >
                Accessories (Compatible)
              </th>
              <th
                scope="col"
                class="px-6 py-3 bg-m-green-1 border-[1px] border-r-gray text-center"
              >
                Accessories (Original)
              </th>
              <th
                scope="col"
                class="px-6 py-3 bg-m-green-1 border-[1px] border-r-gray text-center"
              >
                ORU Verified
              </th>
            </tr>
          </thead>
          <tbody>
            {productData &&
              productData?.map((item) => {
                return (
                  <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 overflow-x-scroll font-Roboto-Regular text-center">
                    <th
                      scope="row"
                      class="px-6 py-4 font-medium text-gray-400 whitespace-nowrap dark:text-white  bg-white drop-shadow-xl  border-[1px]"
                    >
                      {item?.userName &&
                      item?.externalSourceImage !=
                        "https://d1tl44nezj10jx.cloudfront.net/devImg/oru/product/mobiledevices/img/txt_phone.png" ? (
                        item?.userName
                      ) : (
                        <Image
                          src={item?.externalSourceImage}
                          height={30}
                          width={70}
                        />
                      )}
                    </th>
                    <td class="px-6 py-4 border-[1px] ">
                      {item?.externalSourcePrice}
                    </td>
                    <td class="px-6 py-4  border-[1px]">
                      {item?.Object?.isOtherVendor == "N"
                        ? item?.Object?.warranty
                        : "Not Applicable"}
                    </td>
                    <td class="px-6 py-4  border-[1px]">
                      {item?.Object?.isOtherVendor == "N"
                        ? "Not Applicable"
                        : "6 months"}
                    </td>
                    <td class="px-6 py-4 border-[1px]">
                      {item?.Object?.isOtherVendor == "N"
                        ? "Not Applicable"
                        : "Charger, Original Box"}
                    </td>
                    <td class="px-6 py-4 border-[1px]">
                      {item?.Object?.isOtherVendor == "N"
                        ? item?.Object?.charger == "Y"
                          ? item?.Object?.earphone == "Y"
                            ? item?.Object?.originalbox == "Y"
                              ? "Charger, Earphone, Original Box"
                              : "Charger, Earphone"
                            : item?.Object?.originalbox == "Y" ?
                              "Charger, Original Box"
                              :"Charger"
                          : item?.Object?.earphone == "Y"
                          ? item?.Object?.originalbox == "Y"
                            ? "Earphone, Original Box"
                            : "Earphone"
                          : item?.Object?.originalbox == "Y"
                          ? "Original Box"
                          : "Not Available"
                        : "Not Applicable"}
                    </td>
                    <td class="px-6 py-4 border-[1px]">
                      {item?.Object?.isOtherVendor == "N"
                        ? item?.Object?.verified
                          ? "Yes"
                          : "No"
                        : "Not Applicable"}
                    </td>
                  </tr>
                );
              })}
            {/* <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
              <th
                scope="row"
                class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white sticky top-0 left-0 bg-white"
              >
                
              </th>
              <td class="px-6 py-4">$1999</td>
              <td class="px-6 py-4">No</td>
              <td class="px-6 py-4">Yes</td>
              <td class="px-6 py-4">Yes</td>
              <td class="px-6 py-4">Yes</td>
              <td class="px-6 py-4">Yes</td>
              <td class="px-6 py-4">Alwar</td>
            </tr>
            <tr class="bg-white dark:bg-gray-800">
              <th
                scope="row"
                class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white left-0 top-0 sticky bg-white"
              >
                Magic Mouse 2
              </th>
              <td class="px-6 py-4">$99</td>
              <td class="px-6 py-4">Yes</td>
              <td class="px-6 py-4">No</td>
              <td class="px-6 py-4">No</td>
              <td class="px-6 py-4">No</td>
              <td class="px-6 py-4">No</td>
              <td class="px-6 py-4">Delhi</td>
            </tr> */}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default ComparisonTable;
