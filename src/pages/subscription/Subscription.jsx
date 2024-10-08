import { useState } from "react";
import { Dialog, DialogPanel, Radio, RadioGroup } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { CheckIcon } from "@heroicons/react/20/solid";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

const pricing = {
  frequencies: [
    { value: "monthly", label: "Monthly", priceSuffix: "/month" },
    { value: "yearly", label: "Yearly", priceSuffix: "" }, // We'll override this for each tier
  ],
  tiers: [
    {
      name: "Free",
      id: "tier-free",
      href: "#",
      price: { monthly: "0", yearly: "0" },
      yearlyPriceSuffix: "Billed as 948 MAD ", // Custom suffix
      features: ["4000+ MCQs from S1 to S10", "Unlimited Tests Creations"],
    },
    {
      name: "Advanced",
      id: "tier-advanced",
      href: "#",
      price: { monthly: "99", yearly: "79" },
      yearlyPriceSuffix: "Billed as 948 MAD ", // Custom suffix
      features: [
        "All Free Features",
        "40,000+ Questions",
        "Custom Analytics ",
        "Unlimited Tests",
      ],
    },
    {
      name: "Premium",
      id: "tier-premium",
      href: "#",
      price: { monthly: "149", yearly: "119" },
      yearlyPriceSuffix: "Billed as 1428 MAD ", // Custom suffix
      features: [
        "All Advanced Features",
        "80,000+ Questions",
        "Timed Tests",
        "Questions from your University",
        "Priority Support",
      ],
    },
  ],
};

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Subscription = () => {
  const [frequency, setFrequency] = useState(pricing.frequencies[0]);

  return (
    <>
      <Header />
      <div className="bg-gray-900">
        <main>
          {/* Pricing section */}
          <div className="mx-auto mt-12 max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-4xl text-center">
              <h1 className="text-title-xl font-semibold text-[#3A57E8]">
                Choose Your Plan
              </h1>
            </div>

            <div className="mt-7 flex justify-center">
              <fieldset aria-label="Payment frequency">
                <RadioGroup
                  value={frequency}
                  onChange={setFrequency}
                  className="grid grid-cols-2 gap-x-1 border rounded-md border-[#3A57E8] "
                >
                  {pricing.frequencies.map((option) => (
                    <Radio
                      key={option.value}
                      value={option}
                      className="cursor-pointer px-8 py-3 data-[checked]:bg-[#3A57E8] data-[checked]:text-white text-title-p font-semibold text-[#3A57E8]"
                    >
                      {option.label}
                    </Radio>
                  ))}
                </RadioGroup>
              </fieldset>
            </div>

            <div className="isolate mx-auto mt-15 grid max-w-md grid-cols-1 gap-8 lg:mx-0 lg:max-w-none lg:grid-cols-3">
              {pricing.tiers.map((tier) => (
                <div
                  key={tier.id}
                  className={classNames(
                    "flex flex-col justify-between p-7 xl:p-10 border",
                    tier.name === "Advanced"
                      ? "bg-[#3A57E8] text-white border-none"
                      : "border-[#1C89FF]"
                  )}
                >
                  <div>
                    <div
                      className={classNames(
                        "flex w-30 mx-auto items-center justify-center gap-x-4 border",
                        tier.name === "Advanced"
                          ? "border-white"
                          : "border-[#3A57E8]"
                      )}
                    >
                      <h2
                        id={tier.id}
                        className={classNames(
                          "text-base font-semibold leading-8",
                          tier.name === "Advanced"
                            ? "text-white"
                            : "text-[#3A57E8]"
                        )}
                      >
                        {tier.name}
                      </h2>
                    </div>

                    <p className="flex flex-col justify-center items-center mt-7 gap-x-1">
                      <p
                        className={classNames(
                          "text-[69px] font-semibold",
                          tier.name === "Advanced"
                            ? "text-white"
                            : "text-[#3A57E8]"
                        )}
                      >
                        {tier.price[frequency.value]}{" "}
                        <span className="text-title-p ml-[-15px]"> MAD</span>
                      </p>
                      <span
                        className={classNames(
                          "text-[12px] font-semibold mt-[-15px]",
                          tier.name === "Advanced"
                            ? "text-white"
                            : "text-[#9D9D9D]"
                        )}
                      >
                        {frequency.value === "yearly"
                          ? tier.yearlyPriceSuffix
                          : frequency.priceSuffix}
                      </span>
                    </p>

                    <ul
                      className={classNames(
                        "mt-8 space-y-3 text-sm leading-6",
                        tier.name === "Advanced"
                          ? "text-white"
                          : "text-gray-300",
                        "xl:mt-10"
                      )}
                    >
                      {tier.features.map((feature) => (
                        <li
                          key={feature}
                          className="gap-x-3 text-[12px] flex justify-center  font-semibold  "
                        >
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Button aligned to bottom */}
                  <a
                    href={tier.href}
                    aria-describedby={tier.id}
                    className={classNames(
                      "mt-8 block border border-transparent px-4 py-3 text-title-p mx-17 font-semibold text-center justify-stretch",
                      tier.name === "Advanced"
                        ? "bg-[#007AFF] text-white "
                        : "bg-[#3A57E8] text-white"
                    )}
                  >
                    Choose Plan
                  </a>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
      <Footer />
    </>
  );
};

export default Subscription;
