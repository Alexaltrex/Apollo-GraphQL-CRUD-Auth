import React from "react";
import style from "./ReadPage.module.scss"
import {useQuery} from "@apollo/client";
import {LinearPreloader} from "../X_Common/LinearPreloader/LinearPreloader";
import {GET_CATEGORY_LIST} from "../../api/api";
import {ICategoryListItem} from "../../types/category.type";
import {Link} from "react-router-dom";

export const ReadPage = () => {
    const {loading, error, data} = useQuery<{ categories: ICategoryListItem[] }>(
        GET_CATEGORY_LIST,
        {
            //fetchPolicy: "cache-first", // (по-умолчанию), перед запросом данных проверяется их наличие в кеш
            fetchPolicy: "network-only", // не ищет данные в кеше, всегда выполняет запрос
            nextFetchPolicy: "cache-first" // используется для последующих исполнений
        }
    );

    return (
        <div className={style.readPage}>

            {loading && !error && <LinearPreloader/>}

            <h1 className={style.title}>Read - Categories</h1>

            {
                data && (
                    <div className={style.products}>
                        {
                            data.categories.map(({id, name}) => (
                                <Link key={id}
                                      to={`/read/${id}`}
                                      className={style.link}
                                >
                                    {name}
                                </Link>
                            ))
                        }
                    </div>
                )
            }
        </div>
    )
}
