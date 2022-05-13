import HeroSection from "../components/Sections/HeroSection/HeroSection";
import DataSection from "../components/Sections/DataSection/DataSection";
import AboutSection from "../components/Sections/AboutSection/AboutSection";
import ApiSection from "../components/Sections/ApiSection/ApiSection";
import PrivacySection from "../components/Sections/PrivacySection/PrivacySection";
import Footer from "../components/Sections/Footer/Footer";

export default function Index(props) {
    return (
        <>
            <HeroSection />
            <DataSection />
            <AboutSection />
            <ApiSection />
            <PrivacySection />
            <Footer />
        </>
    )
}