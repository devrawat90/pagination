import React, { useEffect, useState } from 'react'
import Table from 'react-bootstrap/Table';
import axios from 'axios'
import Spinner from 'react-bootstrap/Spinner';
import Pagination from 'react-bootstrap/Pagination';

const Home = () => {

    // create state for 

    const [data, setdata] = useState("")
    const [pagedata, setpagedata] = useState([])
    const [page, setpage] = useState(1)
    const [pagecount, setpagecount] = useState(0)



    const getData = async () => {
        try {
            const response = await axios.get("https://dummyjson.com/products")
            // console.log(response.data.products);
            setdata(response.data.products)
        } catch (error) {
            console.log(error);
        }
    }

    const handlenext = () => {

        if (page === pagecount) return page
        setpage(page + 1)

    }
    const handleprev = () => {
        if (page === 1) return page
        setpage(page - 1)
    }

    // console.log(data);
    useEffect(() => {
        getData()
    }, [page])

    useEffect(() => {
        const pagedatacount = Math.ceil(data?.length / 5)
        setpagecount(pagedatacount)

        if (page) {
            const limit = 5
            const skip = page * limit

            // const dataskip = data.slice(skip - limit, skip)
            const dataskip = data.slice(page === 1 ? 0 : skip - limit, skip)
            // const dataskip = data.slice(0, skip)
            setpagedata(dataskip)
        }


    }, [data])
    // console.log(pagecount);

    return (
        <div className='table_div mt-3 p-5' >
            <h1>User Data</h1>
            <div>
                <Table striped="columns">
                    <thead>
                        <tr>
                            <th>id</th>
                            <th>price </th>
                            <th>title</th>
                            <th>body </th>
                            <th>img </th>

                        </tr>
                    </thead>
                    <tbody>
                        {
                            pagedata.length > 0 ? pagedata.map((element, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{element.id}</td>
                                        <td>{element.price}</td>
                                        <td>{element.title}</td>
                                        <td>{element.description}</td>
                                        <td> <img src={element.thumbnail} style={{ width: "60px", height: "60px" }} alt='' /></td>
                                    </tr>

                                )
                            }) : <div className='d-flex justify-content-center'>Loading....  <Spinner animation="border" variant="danger" /></div>
                        }


                    </tbody>
                </Table></div>

            <div className='d-flex justify-content-center'>
                <Pagination>

                    <Pagination.Prev disabled={page === 1} onClick={handleprev} />


                    {
                        Array(pagecount).fill(null).map((element, index) => {
                            return (<Pagination.Item onClick={() => (setpage(index + 1))} key={index} active={page === index + 1 ? true : false}>{index + 1}</Pagination.Item>)



                        })
                    }

                    <Pagination.Next disabled={page === pagecount} onClick={handlenext} />

                </Pagination>
            </div>


        </div>
    )
}

export default Home