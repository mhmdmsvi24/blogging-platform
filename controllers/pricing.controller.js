const PricingData = [
    {
        bannerText: "1 €/month for the first 3 months",
        bannerColor: "green",
        title: "basic",
        subTitle: "For sole proprietors",
        tag: "Particularly popular",
        price: "25 &euro;",
        duration: "Billing once a year",
        features: [
            {
                title: "Card fees start from",
                list: ["2.1% + 0.30 € EUR online",
                    "1.5 % + 0.00 € EUR for personal sale",
                    "2% external payment providers"]
            }, {
                title: "Functional highlights",
                list: [
                    "10 inventory locations",
                    "24/7 chat support",
                    "Localized worldwide sales(3 markets)",
                    "POS Lite"]
            }],
        buttonText: "Try For Free",
        secondaryButton: false
    }, {
        bannerText: "1 €/month for the first 3 months",
        bannerColor: "green",
        title: "basic",
        subTitle: "For sole proprietors",
        tag: false,
        price: "25 &euro;",
        duration: "Billing once a year",
        features: [{
            title: "Card fees start from", list: ["2.1% + 0.30 € EUR online",
                "1.5 % + 0.00 € EUR for personal sale",
                "2% external payment providers"]
        }, {
            title: "Functional highlights",
            list: [
                "10 inventory locations",
                "24/7 chat support",
                "Localized worldwide sales(3 markets)",
                "POS Lite"]
        }],
        buttonText: "Try For Free",
        secondaryButton: false
    }, {
        bannerText: "1 €/month for the first 3 months",
        bannerColor: "green",
        title: "basic",
        subTitle: "For sole proprietors",
        tag: false,
        price: "25 &euro;",
        duration: "Billing once a year",
        features: [{
            title: "Card fees start from", list: ["2.1% + 0.30 € EUR online",
                "1.5 % + 0.00 € EUR for personal sale",
                "2% external payment providers"]
        }, {
            title: "Functional highlights",
            list: [
                "10 inventory locations",
                "24/7 chat support",
                "Localized worldwide sales(3 markets)",
                "POS Lite"]
        }],
        buttonText: "Try For Free",
        secondaryButton: false
    }, {
        bannerText: "1 €/month for the first 3 months",
        bannerColor: "blue",
        title: "basic",
        subTitle: "For sole proprietors",
        tag: false,
        price: "25 &euro;",
        duration: "Billing once a year",
        features: [{
            title: "Card fees start from", list: ["2.1% + 0.30 € EUR online",
                "1.5 % + 0.00 € EUR for personal sale",
                "2% external payment providers"]
        }, {
            title: "Functional highlights",
            list: [
                "10 inventory locations",
                "24/7 chat support",
                "Localized worldwide sales(3 markets)",
                "POS Lite"]
        }],
        buttonText: "Try For Free",
        secondaryButton: "More Information"
    }]

export const pricing_controller = (req, res) => {
    res.status(200).render("pricing/pricing.html", { cardData: PricingData });
};
