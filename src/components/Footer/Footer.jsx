import { useTranslation } from "react-i18next";
import "./footer.css";
// import Logo from "../../images/Logo.svg";
// import BollHolaLogo from '../../images/BollHola_logo.png';
import BollHolaLogo from '../../images/ballhola_green_x1024-01.png';




function Footer({ refs }) {
  const { t } = useTranslation();
  const scrollToSection = (sectionRef) => {
    sectionRef?.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div>
      <footer className="footer container">
        <nav>
          <ul className="footer__menu">
            <li>
              <img
                className="footer__logo"
                src={BollHolaLogo}
                alt="logo"
                onClick={() => scrollToSection(refs.heroRef)}
                height={31}
                width={31}
              />
            </li>
            <li>
              <a
                className="footer__link"
                href="#features"
                onClick={() => scrollToSection(refs.featuresRef)}
              >
                {t("nav.features")}
              </a>
            </li>
            {/*<li>*/}
            {/*  <a*/}
            {/*    className="footer__link"*/}
            {/*    href="#reviews"*/}
            {/*    onClick={() => scrollToSection(refs.reviewsRef)}*/}
            {/*  >*/}
            {/*    {t("nav.reviews")}*/}
            {/*  </a>*/}
            {/*</li>*/}
            <li>
              <a
                className="footer__link"
                href="#demo"
                onClick={() => scrollToSection(refs.demoRef)}
              >
                {t("nav.demo")}
              </a>
            </li>
            <li>
              <a
                className="footer__link"
                href="#download"
                onClick={() => scrollToSection(refs.downloadRef)}
              >
                {t("nav.download")}
              </a>
            </li>
            <li>
              <a
                className="footer__link"
                href="#contact"
                onClick={() => scrollToSection(refs.contactRef)}
              >
                {t("nav.contact")}
              </a>
            </li>
          </ul>
        </nav>
        <p className="footer__text">{t("footer.rights")}</p>
      </footer>
    </div>
  );
}
export default Footer;
