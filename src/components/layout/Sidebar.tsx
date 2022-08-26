import React from 'react';
import Link from 'next/link'
import { useTranslation } from "next-i18next";

const Sidebar = (): JSX.Element => {
  const { t } = useTranslation("common");
  return (
    <aside className="main-sidebar custom-theme elevation-4">.
      <a href="/" className="brand-link">
        <img src="/img/AdminLTELogo.png"
          alt="Proton Logo"
          className="brand-image img-circle elevation-0"
          style={{ opacity: ".9", marginRight: "15px", width: "40px", height: "40px", objectFit: "cover", borderRadius: "30px" }}
        />
        <div>
          <span className="brand-text font-weight-light">Urban Fortnight</span>
        </div>
      </a>
      <div className="sidebar">
        <nav className="mt-2">
          <ul className="nav nav-flat nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
            <li className="nav-item">
              <Link href="/">
                <a href="#" className="nav-link active">
                  <i className="nav-icon fas fa-chart-pie"></i>
                  <p>
                    {t("dashboard")}
                  </p>
                </a>
              </Link>
            </li>
            <li className="nav-item has-treeview">
              <a href="#" className="nav-link">
                <i className="nav-icon fas fa-star"></i>
                <p>
                  {t("favorite")}
                  <i className="right fas fa-angle-left"></i>
                </p>
              </a>
              <ul className="nav nav-treeview">
                <li className="nav-item">
                  <a href="#" className="nav-link">
                    <i className="far fa-circle nav-icon"></i>
                    <p>{t("item")}</p>
                  </a>
                </li>
              </ul>
            </li>
            <li className="nav-item has-treeview">
              <a href="#" className="nav-link">
                <i className="nav-icon fas fa-th"></i>
                <p>
                  {t("register")}
                  <i className="right fas fa-angle-left"></i>
                </p>
              </a>
              <ul className="nav nav-treeview">              
                <li className="nav-item">
                  <Link href="/terminal">
                    <a className="nav-link">
                      <i className="far fa-circle nav-icon"></i>
                      <p>{t("terminal")}</p>
                    </a>
                  </Link>
                </li>
              </ul>
            </li>
            <li className="nav-item has-treeview">
              <a href="#" className="nav-link">
                <i className="nav-icon fas fa-users"></i>
                <p>
                  {t("commercial")}
                  <i className="fas fa-angle-left right"></i>
                </p>
              </a>
              <ul className="nav nav-treeview">
                <li className="nav-item">
                  <a href="#" className="nav-link">
                    <i className="far fa-circle nav-icon"></i>
                    <p>{t("item")}</p>
                  </a>
                </li>
              </ul>
            </li>
            <li className="nav-item has-treeview">
              <a href="#" className="nav-link">
                <i className="nav-icon fas fa-hand-paper"></i>
                <p>
                  {t("operational")}
                  <i className="right fas fa-angle-left"></i>
                </p>
              </a>
              <ul className="nav nav-treeview">
                <li className="nav-item">
                  <a href="#" className="nav-link">
                    <i className="far fa-circle nav-icon"></i>
                    <p>{t("item")}</p>
                  </a>
                </li>
              </ul>
            </li>

            <li className="nav-item has-treeview">
              <a href="#" className="nav-link">
                <i className="nav-icon fas fa-money-bill-alt"></i>
                <p>
                  {t("financial")}
                  <i className="right fas fa-angle-left"></i>
                </p>
              </a>
              <ul className="nav nav-treeview">
                <li className="nav-item">
                  <a href="#" className="nav-link">
                    <i className="far fa-circle nav-icon"></i>
                    <p>{t("item")}</p>
                  </a>
                </li>
              </ul>
            </li>
            <li className="nav-item has-treeview">
              <a href="#" className="nav-link">
                <i className="nav-icon fas fa-scroll"></i>
                <p>
                  {t("reporting")}
                  <i className="right fas fa-angle-left"></i>
                </p>
              </a>
              <ul className="nav nav-treeview">
                <li className="nav-item">
                  <a href="#" className="nav-link">
                    <i className="far fa-circle nav-icon"></i>
                    <p>{t("item")}</p>
                  </a>
                </li>
              </ul>
            </li>
            <li className="nav-header">{t("Settings")}</li>
            <li className="nav-item">
              <Link href="/settings">
                <a href="#" className="nav-link active">
                  <i className="nav-icon fas fa-cogs"></i>
                  <p>{t("settings")}</p>
                </a>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;









