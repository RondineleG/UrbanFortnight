import BaseLayout from '@/components/layout/BaseLayout';
import CardBox from '@/components/shared/CardBox';
import dynamic from "next/dynamic";
import LanguageSwitcher from '@/components/shared/LanguageSwitcher';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const ThemeSwitcher = dynamic(() => import("@/components/shared/ThemeSwitcher"), {
    ssr: false,
});

const Settings = () => {
    const { t } = useTranslation("settings");
    return (
        <BaseLayout contentTitle={t("settingsTitle")}>
            <CardBox toggleButtonVisibility={"block"} title={t("settingsCardTitle")}>
                <div className="form-group">
                    <h3 className="control-sidebar-subheading">  {t("settingsLanguage")}</h3>
                    <LanguageSwitcher />
                </div>
                <div className="form-group">
                    <h3 className="control-sidebar-subheading"> {t("settingsTheme")}</h3>
                    <ThemeSwitcher />
                </div>
            </CardBox>
        </BaseLayout>
    );
};

export const getStaticProps = async ({ locale }) => ({
    props: {
      ...await serverSideTranslations(locale,  ["settings", "common"]),
    },
  })
  

export default Settings;

