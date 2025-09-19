import React from "react";
import { useRef, useState, useEffect } from "react";
import { FaCopy } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";

const Manager = () => {
  const ref = useRef();
  const passwordref = useRef();

  const [form, setform] = useState({ site: "", username: "", password: "" });
  const [passwordArray, setpasswordArray] = useState([]);

  const getpassword = async () => {
    let req = await fetch("http://localhost:3000/");
    let passwords = await req.json();
    console.log(passwords);
    setpasswordArray(passwords);
  };

  useEffect(() => {
    getpassword();
  }, []);

  const copyText = (text) => {
    toast("🦄 Copy to clipboard ", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    navigator.clipboard.writeText(text);
  };

  const showpassword = () => {
    passwordref.current.type = "text";
    if (ref.current.src.includes("icon/eyecross.png")) {
      ref.current.src = "icon/eye.png";
      passwordref.current.type = "password";
    } else {
      ref.current.src = "icon/eyecross.png";
      passwordref.current.type = "text";
    }
  };

  const savepassword = async () => {
    console.log(form);
      await fetch("http://localhost:3000/",
       {
      method: "DELETE",
      headers: { "Content-Type": "application/x-www-form-urlencoded", },
      body: JSON.stringify({id:form.id}),
    });

    setpasswordArray([...passwordArray, { ...form, id: uuidv4() }]);
    await fetch("http://localhost:3000/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ ...form, id: uuidv4() }),
    });
    setform({ site: "", username: "", password: "" });
    console.log([...passwordArray, form]);
    toast("🦄 Password save successfully ", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  };

  const deletepassword = async (id) => {
    let c = confirm("do you really want to delete this password")
    if(c){
    console.log("this is the unique id ", id);
    let req = fetch("http://localhost:3000/",
      {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({id}),
      });
      setpasswordArray(passwordArray.filter((item) => item.id !== id));
      
    toast("🦄 Delete password ", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  }
  };

  const editpassword = (id) => {
    console.log("this is the unique id edit ", id);
    setform({...passwordArray.filter((i) => i.id === id)[0],id:id});
    setpasswordArray(passwordArray.filter((item) => item.id !== id));
  };

  const handlechange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <>
      {/* this is toestify using npm tostify */}
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]">
        <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-green-400 opacity-20 blur-[100px]"></div>
      </div>
      <div className=" mycontainer  ">
        <h1 className="text-4xl font-bold text-center">
          <span className="text-green-800">&lt;</span>
          Pass
          <span className="text-green-700">OP/&gt;</span>
        </h1>
        <p className="text-green-900 text-center">your own pass manager </p>

        <div className="container  flex flex-col gap-8 items-center">
          <input
            onChange={handlechange}
            placeholder="Enter Website URL"
            value={form.site}
            className="bg-white rounded-full border border-green-500 w-full text-black p-4 py-1"
            type="text"
            name="site"
            id="site"
          />

          <div className="flex w-full gap-8">
            <input
              onChange={handlechange}
              value={form.username}
              placeholder="Enter Username"
              className="bg-white rounded-full border border-green-500 w-full text-black p-4 py-1"
              type="text"
              name="username"
              id="username"
            />
            <div className="relative">
              <input
                onChange={handlechange}
                ref={passwordref}
                placeholder="Enter Password"
                value={form.password}
                className="bg-white rounded-full border border-green-500 w-full text-black p-4 py-1"
                type="password"
                name="password"
                id="password"
              />
              <span
                className="absolute right-[3px] top-[4px] cursor-pointer"
                onClick={showpassword}
              >
                <img
                  ref={ref}
                  className="p-1"
                  width={26}
                  src="icon/eye.png"
                  alt="eye"
                />
              </span>
            </div>
          </div>

          <button
            onClick={savepassword}
            className="flex justify-center items-center bg-green-500 hover:bg-green-300 px-4 py-2 rounded-full w-fit border-2 border-green-900"
          >
            <lord-icon
              src="https://cdn.lordicon.com/efxgwrkc.json"
              trigger="hover"
            ></lord-icon>
            Add Password
          </button>
        </div>
        <div>
          <h2 className="font-bold text-xl py-4">your password</h2>
          {passwordArray.length === 0 && <div>No Password</div>}
          {passwordArray.length != 0 && (
            <table className="table-auto w-full rounded-xl overflow-hidden ">
              <thead className="bg-green-800 text-white">
                <tr>
                  <th className="py-2">site</th>
                  <th className="py-2">username</th>
                  <th className="py-2">password</th>
                  <th className="py-2">Action</th>
                </tr>
              </thead>
              <tbody className="bg-green-100 ">
                {passwordArray.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td className="py-2 text-center items-center justify-center w-32   ">
                        <div className="flex items-cente justify-center gap-2">
                          <a href={item.site} target="_blank" className="flex">
                            {item.site}
                          </a>

                          <FaCopy
                            onClick={() => copyText(item.site)}
                            className="text-green-700 cursor-pointer hover:text-green-900 flex my-1"
                          />
                        </div>
                      </td>

                      <td className="py-2 text-center w-32">
                        <div className="flex items-center justify-center gap-2">
                          <span>{item.username}</span>
                          <FaCopy
                            onClick={() => copyText(item.username)}
                            className="text-green-700 cursor-pointer hover:text-green-900"
                          />
                        </div>
                      </td>
                      <td className="py-2 text-center w-32">
                        <div className="flex items-center justify-center gap-2">
                          <span>{"*".repeat(item.password.length)}</span>
                          <FaCopy
                            onClick={() => copyText(item.password)}
                            className="text-green-700 cursor-pointer hover:text-green-900"
                          />
                        </div>
                      </td>
                      <td className="py-2 text-center w-32">
                        <span
                          className="cursor-pointer mx-2"
                          onClick={() => {
                            deletepassword(item.id);
                          }}
                        >
                          <lord-icon
                            src="https://cdn.lordicon.com/xyfswyxf.json"
                            trigger="hover"
                            style={{ width: 25, height: 25 }}
                          ></lord-icon>
                        </span>
                        <span
                          className="cursor-pointer mx-2"
                          onClick={() => {
                            editpassword(item.id);
                          }}
                        >
                          <lord-icon
                            src="https://cdn.lordicon.com/exymduqj.json"
                            trigger="hover"
                            style={{ width: 25, height: 25 }}
                          ></lord-icon>
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
};

export default Manager;
