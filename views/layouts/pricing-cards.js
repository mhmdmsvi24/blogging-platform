import nunjucks from "nunjucks";
import { Button } from "./button.js";

export function PricingCards({ cardData }) {
    const html = `
        <div class="rounded-2xl shadow shadow-black/20 overflow-hidden h-full">
            <div class="${cardData.bannerColor === "green" ? "bg-[#45f298]" : "bg-[#255dee]"} px-2 py-2 text-center">${cardData.bannerText}</div>
            <div class="flex flex-col px-2 py-4">
                <div class="flex flex-col basis-[10%]">
                    <div>
                        ${cardData.tag ? `<div class="flex justify-between">
                                <div class="capitalize">${cardData.title}</div>
                                <div>${cardData.tag}</div>
                            </div>` : `<div>${cardData.title}</div>`}
                    </div>
                    <div class="capitalize">${cardData.subTitle}</div>
                </div>

                <div>
                    <div class="flex gap-2">
                        <div class="text-4xl">${cardData.price}</div>
                        <div>EUR/Month</div>
                    </div>
                    <div>${cardData.duration}</div>
                </div>
                <div class="h-[0.5px] bg-black/20 my-2"></div>
                <div>
                    ${cardData.features.map(feature => `
                        <div class="font-bold">${feature.title}</div>
                        <ul class="text-gray-600">${feature.list.map(item => `<li>${item}</li>`).join('')}</ul>
                    `).join('')}
                </div>
                <div class="flex flex-col justify-center">
                    <div>${Button({ text: "Try For Free", size: "full" })}</div>
                    <div class="self-center">${cardData.secondaryButton ? Button({ text: cardData.secondaryButton, variant: "text" }) : ""}</div>
                </div>
            </div>
        </div>
    `;
    return new nunjucks.runtime.SafeString(html);
}
