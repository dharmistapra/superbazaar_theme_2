import { ChevronDown } from "lucide-react"
import Link from "next/link"
const data = [
    {
        "id": "684114c545f76b8ae5035bb8",
        "position": 1,
        "name": "New Arrivals",
        "title": "New Arrivals",
        "url": "new-arrivals",
        "image": "",
        "children": []
    },
    {
        "id": "67a99d02f033000f71900a39",
        "position": 2,
        "name": "Sarees",
        "title": "SAREES CATALOGS",
        "url": "sarees",
        "image": "uploads/category/1739169041524-612104041.webp",
        "children": [
            {
                "title": "",
                "children": [
                    {
                        "id": "684117a345f76b8ae5035bc1",
                        "name": "Silk Sarees",
                        "title": "",
                        "url": "silk-sarees",
                        "image": ""
                    },
                    {
                        "id": "684117ae45f76b8ae5035bc2",
                        "name": "Designer Sarees",
                        "title": "",
                        "url": "designer-sarees",
                        "image": ""
                    },
                    {
                        "id": "684117f745f76b8ae5035bc3",
                        "name": "Printed Sarees",
                        "title": "",
                        "url": "printed-sarees",
                        "image": ""
                    }
                ]
            }
        ]
    },
    {
        "id": "67a99e0bf033000f71900a4c",
        "position": 3,
        "name": "Salwar Suits",
        "title": "Salwar Suits",
        "url": "salwar-suits",
        "image": "uploads/category/1739169291559-261161205.webp",
        "children": [
            {
                "title": "",
                "children": [
                    {
                        "id": "6841173c45f76b8ae5035bbb",
                        "name": "Plazzo Suits",
                        "title": "",
                        "url": "plazzo-suits",
                        "image": ""
                    },
                    {
                        "id": "6841176b45f76b8ae5035bbe",
                        "name": "Pakistani Suits",
                        "title": "",
                        "url": "pakistani-suits",
                        "image": ""
                    },
                    {
                        "id": "6841178d45f76b8ae5035bc0",
                        "name": "Readymade Suits",
                        "title": "",
                        "url": "readymade-suits",
                        "image": ""
                    },
                    {
                        "id": "6841174b45f76b8ae5035bbc",
                        "name": "Anarkali Suits",
                        "title": "",
                        "url": "anarkali-suits",
                        "image": ""
                    },
                    {
                        "id": "6841175d45f76b8ae5035bbd",
                        "name": "Straight Cut Suits",
                        "title": "",
                        "url": "straight-cut-suits",
                        "image": ""
                    },
                    {
                        "id": "6841177945f76b8ae5035bbf",
                        "name": "Punjabi Suits",
                        "title": "",
                        "url": "punjabi-suits",
                        "image": ""
                    }
                ]
            }
        ]
    },
    {
        "id": "67a99ed3f033000f71900a5c",
        "position": 4,
        "name": "Lehengas",
        "title": "Lehengas",
        "url": "lehengas",
        "image": "uploads/category/1739169491420-744423077.webp",
        "children": [
            {
                "title": "",
                "children": [
                    {
                        "id": "6841181a45f76b8ae5035bc5",
                        "name": "Designer Lehengas",
                        "title": "",
                        "url": "designer-lehengas",
                        "image": ""
                    },
                    {
                        "id": "6841180e45f76b8ae5035bc4",
                        "name": "Bridal Lehengas",
                        "title": "",
                        "url": "bridal-lehengas",
                        "image": ""
                    }
                ]
            }
        ]
    },
    {
        "id": "684116d645f76b8ae5035bb9",
        "position": 5,
        "name": "Gowns",
        "title": "Gowns",
        "url": "gowns",
        "image": "",
        "children": []
    },
    {
        "id": "684116f145f76b8ae5035bba",
        "position": 6,
        "name": "Kurtis",
        "title": "Kurtis",
        "url": "kurtis",
        "image": "",
        "children": []
    },
    {
        "id": "6852692be76224db13e4f44a",
        "position": 7,
        "name": "Mens's Wear",
        "title": "",
        "url": "menss-wear",
        "image": "",
        "children": []
    },
    {
        "id": "68949e7948764004e116b0c7",
        "position": 8,
        "name": "Wholesale",
        "title": "",
        "url": "wholesale",
        "image": "",
        "children": []
    }
]

const Menu = () => {
  return (
    <div className="flex justify-center items-center mt-5">
      <ul className="flex direction-row gap-4">
        {data &&
          data.length > 0 &&
          data.map((item) => (
            <li key={item.id} className="relative group">
              <Link
                href={`/${item.url}`}
                className="flex items-center gap-1 px-3 py-2 text-gray-700 hover:text-red-400 font-medium transition-colors"
              >
                {item.name}
                {item?.children && item.children.length > 0 && (
                  <ChevronDown
                    size={16}
                    className="transition-transform duration-200 group-hover:rotate-180 mt-1"
                  />
                )}
              </Link>

              {item?.children && item.children.length > 0 && (
                <div
                  className="absolute left-0 top-full opacity-0 invisible group-hover:visible group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300 ease-out bg-white shadow-lg rounded-md mt-2 z-50 min-w-[200px]"
                >
                  <ul className="py-2">
                    {item.children[0].children.map((child) => (
                      <li key={child.id}>
                        <Link
                          href={`/${child.url}`}
                          className="block px-4 py-2 text-gray-600 hover:bg-gray-100 hover:text-red-400 transition-colors"
                        >
                          {child.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </li>
          ))}
      </ul>
    </div>
  )
}

export default Menu

