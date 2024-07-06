"use client"
import style from './HeaderV2.module.css'
import Link from "next/link"
import Links from "./Links/Links"
import { useContext, useEffect, useState } from 'react';
import { signOut } from 'next-auth/react';
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { Country } from "country-state-city";
import { get_currency, set_currency } from '@/app/server-actions/setting/setting';
import { StateContext } from '@/app/context/State';


const HeaderV2 = ({ loggedInUser }) => {

  const [showOption, setShowOption] = useState(false);
  const [loading, setLoading] = useState(false);
  const [currencyLoading, setCurrencyLoading] = useState(false);
  const [showCurrencies, setShowCurrencies] = useState(false);
  const [currencies, setCurrencies] = useState([]);
  // const [activeCurrency, setGlobalCurrency] = useState({
  //   name: "USD",
  //   isoCode: "US",
  //   flag: "🇺🇸",
  // });

  const {globalCurrency, setGlobalCurrency} = useContext(StateContext);


  const handleLoggedout = async () => {
    setLoading(true)
    const res = await signOut({ redirect: true });
    console.log(res);
    setLoading(false)
  }


  const handleClickOutside = (e) => {
    if (e.target.className !== 'settingOption') {
      setShowOption(false)
      setShowCurrencies(false)
    }
  }

  const loadCurrencies = () => {
    const currencies = Country.getAllCountries();
    setCurrencies(currencies);
  }

  const loadActiveCurrency = async () => {

    try {

      let data = await get_currency();

      if (data.name) {
        setGlobalCurrency(data);
      }

    } catch (error) {
      console.log({ error: error.message })
    }
  }

  const settingActiveCurrency = async (country) => {

    setCurrencyLoading(true)
    try {

      const currencyObj = {
        name: country.currency,
        isoCode: country.isoCode,
        flag: country.flag,
      }


      const data = await set_currency(currencyObj);
      setGlobalCurrency(data);
      setCurrencyLoading(false);

    } catch (error) {
      console.log({ error: error.message })
      setCurrencyLoading(false)
    }
  }

  useEffect(() => {
    loadCurrencies();
    loadActiveCurrency();
    document.addEventListener("click", handleClickOutside, true)
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    }
  }, [])

  return (
    <header className={style.header}>

      {/* Header Wrapper  */}
      <div className={`${style.wrapper} wrapper-width`}>

        {/* Logo Part  */}
        <div className={style.logoPart} >
          <Link href={'/'}>
            <img className={style.logo} src="/logo.png" alt="" />
          </Link>
        </div>

        {/* NavLinks part */}
        <Links />

        {/* My Profile part */}
        <div className={style.mePart} >

          <div
            className={`${style.currencies}  ${showCurrencies ? style.currenciesOnn : style.currenciesOff}`}
            onClick={() => setShowCurrencies(!showCurrencies)}
          >
            <span className={style.heading}>{globalCurrency.flag}</span>
            <span className={style.heading}>({globalCurrency.name})</span>

            <ul className={`${style.currenciesOptions} ${style.options}`}>

              {
                currencies?.map(i => 
                <li className={style.option} key={i.isoCode} onClick={()=>settingActiveCurrency(i)}>
                  <span>{i.flag}</span>
                  <span>({i.currency})</span>
                  {currencyLoading &&
                    <AiOutlineLoading3Quarters className={`loadingIcon loadingSM ${style.loadingIcon}`} />}
                </li>)
              }

            </ul>

          </div>

          <div
            className={`${style.profileImgWrapper}  ${showOption ? style.OptionIsOnn : style.OptionIsOff}`} onClick={() => setShowOption(!showOption)}>
            <img src={loggedInUser.profilePic.url} alt="" />

            <ul className={`${style.options} ${(showOption) ? style.OptionIsOn : style.OptionIsOff}`}>
              <Link className={style.option} href={`/profile/${loggedInUser.userName}`}>View Profile</Link>
              <Link className={style.option} href={`/admin-dashboard`}>Dashboard</Link>
              <li className={style.option} onClick={handleLoggedout}>{loading && <AiOutlineLoading3Quarters className={`loadingIcon loadingSM ${style.loadingIcon}`} />} Logout</li>
            </ul>

          </div>
          <span className={style.heading}>
            Me
          </span>



        </div>
      </div>
    </header>
  )

}


export default HeaderV2