import style from "./First.module.scss"
import Dropdown from "../../components/dropdown/Dropdown"
import Header from "../../components/header/Header"
import { useEffect, useState } from "react"
import axios from "axios"
import Card from "../../components/card/Card"
import SearchInputBox from "../../components/searchInputBox/SearchInputBox"
import useDebounce from "../../helper/UseDebounce"
import { getDataApiCall } from "../../helper/ApiCallFunction"

function First() {
    const [allData, setAllData] = useState<any>([])
    const [searchTiltle, setSearchTitle] = useState("")
    const [searchType, setSearchType] = useState("")

    /** Constants **/
    // This are the option available in public api for search by type 
    const typeOptionList = ["All", "Movie", "Series", "Episode"] 
    const ApiKey = "8aaa7ab2" //Api key for Api call

    /** function for Api call**/
    // This Function give the result of Movie which having title dil 
    // I have added default title as dil because this Api is not having all default Data 

    const getDefaultData = (paramsObj: object) => {
        axios.get(`https://www.omdbapi.com/`, {
            params: paramsObj
        }).then(
            (res) => {
                setAllData(res?.data?.Search)
            }
        )
    }

    /**For First Time Api Call for getting Data **/
    useEffect(
        () => {
            const param = {
                s: "dil", //default title search 
                apiKey: ApiKey
            }
            getDefaultData(param)
        }, []
    )

    /** Function for getting option selection from dropdown and Api call for filter**/
    const getDataDropdown = async (data: string) => {
        setSearchType(data)
        const paramsData: Record<string, any> = {
            apiKey: ApiKey,
            s: "dil"
        }
        if (data !== "All") {
            paramsData["type"] = data
        }
        //checking if search by title available or not
        if (searchTiltle?.length > 0) {
            paramsData["s"] = searchTiltle
        }
        const reult = await getDataApiCall(paramsData)
        setAllData(reult?.data?.Search)
    }

    /**Function for Search by titile and Api Call**/
    const handleSearch = async (e: any) => {
        const name = e?.target.value?.trim()
        setSearchTitle(name)
        const paramsData: Record<string, any> = {
            s: name ? name : "dil",
            apiKey: ApiKey,
        }
        // checking if search by type available or not 
        if (searchType?.length > 0 && searchType !== "All") {
            paramsData["type"] = searchType
        }
        const data = await getDataApiCall(paramsData)
        console.log(data)
        setAllData(data?.data?.Search)
    }

    /**Function debounce , It helps in Calling Api After some delay **/
    const debouncedHandleSearchPhoneNo = useDebounce(handleSearch, 500);

    return (
        <div className={style.firstScreenWrapper}>
            <div className={style.headerDiv}> <Header /></div>
            <div className={style.filterContainer}>
                <div className={style.dropdownDiv}>
                    <SearchInputBox placeholder="Search by Title" onChange={debouncedHandleSearchPhoneNo} />
                </div>
                <div className={style.dropdownDiv}>
                    <Dropdown optionList={typeOptionList} setDataOutside={getDataDropdown} defaultText='Select Type' />
                </div>
            </div>
            <div className={style.cardContainer}>
                {allData?.length > 0 ?
                    allData?.map((data: any, i: number) => {
                        return <div className={style.cardDiv} key={i}>
                            <Card
                                img={data?.Poster}
                                title={data?.Title}
                                type={data?.Type}
                                year={data?.Year}
                            />
                        </div>
                    })
                    :
                    <div className={style.noDataDiv}>
                        <p>No Data Found</p>
                    </div>
                }

            </div>
        </div>
    )
}

export default First