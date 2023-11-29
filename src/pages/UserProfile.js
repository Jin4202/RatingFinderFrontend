import React, { useContext, useEffect, useState } from "react";
import useAPIService from "../service/useAPIService";
import { getUserReviewById } from "../service/APIService";
import axios from "axios";
import { Link, useLocation, useParams } from "react-router-dom";
import UserReview from "../components/UserReview/UserReview";
import AuthContext from "../contexts/AuthContext";
import Default_pfp from "../Default_pfp.png";
import Product from "../components/Product/Product";
export default function UserProfile() {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [data, setData] = useState([]);

  const [savedProducts, setSavedProducts] = useState([]);
  const [savedLoading, setSavedLoading] = useState(false);
  const [savedError, setSavedError] = useState(false);

  //[user, loading] --> not working as planned
  // const [loading, data, error] = useAPIService(
  //   () => getUserReviewById(user.user.user_id),
  //   []
  // );

  const handleReviewUpdate = (e) => {
    axios
      .get(`http://localhost:8080/user/${user.user.user_id}/userReview`)
      .then((response) => {
        console.log("response", response);
        setLoading(false);
        setData(response.data);
      })
      .catch((error) => {
        console.log(error);
        setError(true);
        setLoading(false);
      });
  };
  console.log("id", id);
  // const [loading, data, error] = useAPIService(() => getUserReviewById(id));

  useEffect(() => {
    setLoading(true);
    setSavedLoading(true);
    if (id) {
      axios
        .get(`http://localhost:8080/user/${id}/userReview`)
        .then((response) => {
          console.log("response", response);
          setLoading(false);
          setData(response.data);
        })
        .catch((error) => {
          console.log(error);
          setError(true);
          setLoading(false);
        });

      setSavedLoading(false);
    } else {
      axios
        .get(`http://localhost:8080/user/${user.user.user_id}/userReview`)
        .then((response) => {
          console.log("response", response);
          setLoading(false);
          setData(response.data);
        })
        .catch((error) => {
          console.log(error);
          setError(true);
          setLoading(false);
        });

      axios
        .get(`http://localhost:8080/user/save/${user.user.user_id}`)
        .then((response) => {
          console.log("saved products", response);
          setSavedLoading(false);
          setSavedProducts(response.data);
        })
        .catch((error) => {
          console.log(error);
          setSavedError(true);
          setSavedLoading(false);
        });
    }
  }, [id]);

  console.log("data", data);

  return (
    <div>
      <div className="profile">
        <section class="h-100 gradient-custom-2">
          <div class="container py-5 h-100">
            <div class="row d-flex justify-content-center align-items-center h-100">
              <div class="col col-lg-9 col-xl-7">
                <div class="card">
                  <div
                    class="rounded-top text-white d-flex flex-row"
                    style={{ backgroundColor: "#000", height: "200px" }}
                  >
                    <div
                      class="ms-4 mt-5 d-flex flex-column"
                      style={{ width: "150px" }}
                    >
                      <img
                        src={Default_pfp}
                        alt="User"
                        class="img-fluid img-thumbnail mt-4 mb-2"
                        style={{ width: "150px", zIndex: "1" }}
                      />
                      {/* <button
                        type="button"
                        class="btn btn-outline-dark"
                        data-mdb-ripple-color="dark"
                        style={{ zIndex: "1" }}
                      >
                        Edit profile
                      </button> */}
                    </div>
                    <div class="ms-3" style={{ marginTop: "130px" }}>
                      {error ? (
                        <p>ERROR</p>
                      ) : loading ? (
                        <p>LOADING</p>
                      ) : id && data.length > 0 ? (
                        <h5>{data[0].username}</h5>
                      ) : user ? (
                        <h5>{user.user.username}</h5>
                      ) : (
                        <p>G</p>
                      )}
                    </div>
                  </div>
                  <div
                    class="p-4 text-black"
                    style={{ backgroundClip: " #f8f9fa" }}
                  >
                    <div class="d-flex justify-content-end text-center py-1">
                      <div>
                        {error ? (
                          <p>ERROR</p>
                        ) : loading ? (
                          <p>LOADING</p>
                        ) : (
                          <p className="mb-1 h5">{data.length}</p>
                        )}

                        <p class="small text-muted mb-0">Reviews</p>
                      </div>
                    </div>
                  </div>
                  <div class="card-body p-4 text-black">
                    {savedError ? (
                      <p>ERROR IN FETCHING SAVED PRODUCT</p>
                    ) : savedLoading ? (
                      <p>LOADING SAVED PRODUCT</p>
                    ) : savedProducts.length > 0 ? (
                      <div>
                        <div class="d-flex justify-content-between align-items-center mb-4">
                          <p class="lead fw-normal mb-0">
                            {`Saved Products (${savedProducts.length})`}
                          </p>
                        </div>
                        <div row g-2>
                          {savedProducts.map((element) => {
                            return (
                              <Link
                                to={`/product/${element.prod_id}`}
                                key={element.prod_id}
                              >
                                <Product product={element} />
                              </Link>
                            );
                          })}
                        </div>
                      </div>
                    ) : (
                      <p>No saved Products</p>
                    )}

                    <div class="d-flex justify-content-between align-items-center mb-4">
                      <p class="lead fw-normal mb-0">Recent Reviews</p>
                    </div>
                    <div class="row g-2">
                      {error ? (
                        <p>ERROR USER REVIEWS...</p>
                      ) : loading ? (
                        <p> LOADING USER REVIEWS</p>
                      ) : data.length > 0 ? (
                        <div>
                          {data.map((element) => {
                            return (
                              <UserReview
                                userReview={element}
                                handleReviewUpdate={handleReviewUpdate}
                              />
                            );
                          })}
                        </div>
                      ) : (
                        <div>
                          <h2>User has made no reviews</h2>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
