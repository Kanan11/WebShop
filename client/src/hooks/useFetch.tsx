import { useEffect, useState } from "react";

const useFetch = <T extends unknown>(url: string) => {
  // console.log(url)
  // const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);
  
  // demo products
  interface Product {
    id: string | number;
    attributes: {
      isNew?: boolean;
      img?: {
        data?: {
          attributes?: {
            url?: string;
          };
        };
      };
      img2?: {
        data?: {
          attributes?: {
            url?: string;
          };
        };
      };
      title?: string;
      price?: number;
    };
    oldPrice?: number;
  }
  
  const data: Product[] = [
    {
      id: 1,
      attributes: {
        isNew: true,
        img: {
          data: {
            attributes: {
              url: "product1-img1.jpg"
            }
          }
        },
        img2: {
          data: {
            attributes: {
              url: "product1-img2.jpg"
            }
          }
        },
        title: "Product 1",
        price: 50
      },
      oldPrice: 70
    },
    {
      id: 2,
      attributes: {
        isNew: false,
        img: {
          data: {
            attributes: {
              url: "product2-img1.jpg"
            }
          }
        },
        img2: {
          data: {
            attributes: {
              url: "product2-img2.jpg"
            }
          }
        },
        title: "Product 2",
        price: 100
      },
      oldPrice: 120
    },
    {
      id: 3,
      attributes: {
        isNew: true,
        img: {
          data: {
            attributes: {
              url: "product3-img1.jpg"
            }
          }
        },
        img2: {
          data: {
            attributes: {
              url: "product3-img2.jpg"
            }
          }
        },
        title: "Product 3",
        price: 75
      },
      oldPrice: 90
    },
    {
      id: 4,
      attributes: {
        isNew: false,
        img: {
          data: {
            attributes: {
              url: "product4-img1.jpg"
            }
          }
        },
        img2: {
          data: {
            attributes: {
              url: "product4-img2.jpg"
            }
          }
        },
        title: "Product 4",
        price: 60
      },
      oldPrice: 80
    },
    {
      id: 5,
      attributes: {
        isNew: false,
        img: {
          data: {
            attributes: {
              url: "product5-img1.jpg"
            }
          }
        },
        img2: {
          data: {
            attributes: {
              url: "product5-img2.jpg"
            }
          }
        },
        title: "Product 5",
        price: 90
      },
      oldPrice: 100
    }
  ];
  
  
    
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(url);
        const json = await response.json() as T;
        // setData(json);
        console.log(json)
      } catch (error: unknown) {
        if (error instanceof Error) {
          setError(error);
        } else {
          setError(new Error("Unknown error occurred"));
        }
      }
      
      setLoading(false);
    };
    fetchData();
  }, [url]);

  return { data, loading, error };
};

export default useFetch;
