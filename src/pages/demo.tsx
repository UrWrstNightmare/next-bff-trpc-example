import React from "react";
import { trpc } from "@/utils/trpc";

const Demo = () => {
  const [searchData, setSearchData] = React.useState<string>("")
  const { data, isError, isLoading } = trpc.search.useQuery({ query: searchData, maxcount: 5 } )


  const { data: demoData, isLoading: isDemoDataLoading } = trpc.test.useQuery({ data: "test" })

  return <div>
    <input value={ searchData } onChange={(e) => setSearchData(e.currentTarget.value)} />
    <p>Search Term: { searchData }</p>
    <div style={{ borderBottom: "solid 1px #222222", margin: "10px 0" }}/>
    <p>API Result</p>
    { isLoading ? <p>Loading...</p> 
      : data === undefined ? <p>API Error</p> 
      : data.map((e) => <li key={e.id}>{e.title}: {e.description}</li>)}

    { isDemoDataLoading ? <p>Demo Data is Loading...</p>
    : <p>{ demoData?.payload }</p> }
  </div>
}

export default Demo;