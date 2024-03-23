import { useState, useEffect, useRef } from "react";
import Filter from "bad-words";
import { MENULINKS } from "../../constants";
import toast, { Toaster } from "react-hot-toast";
import Fade from "react-reveal/Fade";
import mail from "./mailer";
import gsap from "gsap";
import styles from "./Contact.module.scss";
import { IoIosCheckmarkCircle } from "react-icons/io";

const filter = new Filter();
filter.removeWords("hell", "god", "shit");

const empty = () =>
  toast.error("Please fill the required fields", {
    id: "error",
    style: {
      borderRadius: "10px",
      background: "#333",
      color: "#fff",
    },
  });

const error = () =>
  toast.error("Error sending your message", {
    id: "error",
    style: {
      borderRadius: "10px",
      background: "#333",
      color: "#fff",
    },
  });

const success = () =>
  toast.success("Message sent successfully", {
    id: "success",
    style: {
      borderRadius: "10px",
      background: "#333",
      color: "#fff",
    },
  });

const Contact = () => {
  const initialState = { name: "", email: "", message: "" };
  const [formData, setFormData] = useState(initialState);
  const [mailerResponse, setMailerResponse] = useState("not initiated");
  const [isSending, setIsSending] = useState(false);
  const buttonEl = useRef(null);

  const handleChange = ({ target }) => {
    const { id, value } = target;
    value.length === 0 ? setIsSending(false) : setIsSending(true);
    setFormData((prevVal) => {
      if (
        value.trim() !== prevVal[id] &&
        value.trim().length > prevVal[id].trim().length
      ) {
        return { ...prevVal, [id]: filter.clean(value.trim()) };
      } else {
        return { ...prevVal, [id]: value };
      }
    });
  };

  const emptyForm = () => {
    setFormData(initialState);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { name, email, message } = {
      name: formData.name,
      email: formData.email,
      message: formData.message,
    };

    if (name === "" || email === "" || message === "") {
      empty();
      return setMailerResponse("empty");
    }

    setIsSending(true);
    mail({ name, email, message })
      .then((res) => {
        if (res.status === 200) {
          setMailerResponse("success");
          emptyForm();
        } else {
          setMailerResponse("error");
        }
      })
      .catch((err) => {
        setMailerResponse("error");
        console.error(err);
      });
  };

  useEffect(() => {
    setTimeout(() => {
      setMailerResponse("not initiated");
    }, 10000);
  }, [mailerResponse]);

  useEffect(() => {
    buttonEl.current.addEventListener("click", (e) => {
      if (!buttonEl.current.classList.contains("active")) {
        buttonEl.current.classList.add("active");

        gsap.to(buttonEl.current, {
          keyframes: [
            {
              "--left-wing-first-x": 50,
              "--left-wing-first-y": 100,
              "--right-wing-second-x": 50,
              "--right-wing-second-y": 100,
              duration: 0.2,
              onComplete() {
                gsap.set(buttonEl.current, {
                  "--left-wing-first-y": 0,
                  "--left-wing-second-x": 40,
                  "--left-wing-second-y": 100,
                  "--left-wing-third-x": 0,
                  "--left-wing-third-y": 100,
                  "--left-body-third-x": 40,
                  "--right-wing-first-x": 50,
                  "--right-wing-first-y": 0,
                  "--right-wing-second-x": 60,
                  "--right-wing-second-y": 100,
                  "--right-wing-third-x": 100,
                  "--right-wing-third-y": 100,
                  "--right-body-third-x": 60,
                });
              },
            },
            {
              "--left-wing-third-x": 20,
              "--left-wing-third-y": 90,
              "--left-wing-second-y": 90,
              "--left-body-third-y": 90,
              "--right-wing-third-x": 80,
              "--right-wing-third-y": 90,
              "--right-body-third-y": 90,
              "--right-wing-second-y": 90,
              duration: 0.2,
            },
            {
              "--rotate": 50,
              "--left-wing-third-y": 95,
              "--left-wing-third-x": 27,
              "--right-body-third-x": 45,
              "--right-wing-second-x": 45,
              "--right-wing-third-x": 60,
              "--right-wing-third-y": 83,
              duration: 0.25,
            },
            {
              "--rotate": 60,
              "--plane-x": -8,
              "--plane-y": 40,
              duration: 0.2,
            },
            {
              "--rotate": 40,
              "--plane-x": 45,
              "--plane-y": -300,
              "--plane-opacity": 0,
              duration: 0.375,
              onComplete() {
                setTimeout(() => {
                  buttonEl.current.removeAttribute("style");
                  gsap.fromTo(
                    buttonEl.current,
                    {
                      opacity: 0,
                      y: -8,
                    },
                    {
                      opacity: 1,
                      y: 0,
                      clearProps: true,
                      duration: 0.3,
                      onComplete() {
                        buttonEl.current.classList.remove("active");
                      },
                    }
                  );
                }, 1800);
              },
            },
          ],
        });

        gsap.to(buttonEl.current, {
          keyframes: [
            {
              "--text-opacity": 0,
              "--border-radius": 0,
              "--left-wing-background": "#9f55ff",
              "--right-wing-background": "#9f55ff",
              duration: 0.11,
            },
            {
              "--left-wing-background": "#8b31ff",
              "--right-wing-background": "#8b31ff",
              duration: 0.14,
            },
            {
              "--left-body-background": "#9f55ff",
              "--right-body-background": "#9f55ff",
              duration: 0.25,
              delay: 0.1,
            },
            {
              "--trails-stroke": 171,
              duration: 0.22,
              delay: 0.22,
            },
            {
              "--success-opacity": 1,
              "--success-x": 0,
              duration: 0.2,
              delay: 0.15,
            },
            {
              "--success-stroke": 0,
              duration: 0.15,
            },
          ],
        });
      }
    });
  }, [buttonEl]);

  return (
    <section
      className="mt-30 w-full relative select-none bg-gray-dark-4 pt-20 sm:pt-10 md:pt-5 lg:pt-1 pb-20"
      id={MENULINKS[4].ref}
    >
      <div>
        <Toaster />
      </div>
      <div className="section-container flex flex-col justify-center">
        <div className="flex flex-col work-wrapper">
          <div className="flex flex-col">
            <p className="uppercase tracking-widest text-gray-light-1 seq">
              Services
            </p>
            <h1 className="text-6xl mt-2 font-medium text-gradient w-fit seq">
              UI/UX Services
            </h1>
          </div>
          <h2 className="text-[1.65rem] font-medium md:max-w-lg w-full mt-2 seq">
            Get In Touch.{" "}
          </h2>
        </div>
        <h4
          className="mt-6 md:mt-8 font-medium text-4xl md:text-7xl text-center"
          >
          Starting Price{" "}
          <span className="text-strong font-semibold"></span>
        </h4>


        <h6
          className="mt-6 md:mt-8 font-medium text-4xl md:text-3xl text-center"
          >
          $15{" "}
          <span className="text-strong font-semibold"></span>
        </h6>


        <h6
          className="mt-6  text-center"
          >
          PER FRAME{" "}
          <span className="text-strong font-semibold"></span>
        </h6>

        <p className="mt-6 md:mt-8 uppercase tracking-widest text-gray-light-1 seq text-center">
              By commissioning me, you get the following services below.
              </p>
<br></br>

<div style={{ display: 'flex', justifyContent: 'center' }}>
  <ul style={{ listStyle: 'none', padding: 0 }}>
    <li style={{ display: 'flex', alignItems: 'center' }}>
      <IoIosCheckmarkCircle style={{ color: 'yellow', marginRight: '8px' }} />
      <span style={{ marginTop: '5px' }}>Outstanding UI</span>
    </li>
    <li style={{ display: 'flex', alignItems: 'center' }}>
      <IoIosCheckmarkCircle style={{ color: 'yellow', marginRight: '8px' }} />
      <span style={{ marginTop: '5px' }}>Fully imported into Roblox.</span>
    </li>
    <li style={{ display: 'flex', alignItems: 'center' }}>
      <IoIosCheckmarkCircle style={{ color: 'yellow', marginRight: '8px' }} />
      <span style={{ marginTop: '5px' }}>ZIP Files (Images, PSD, etc)</span>
    </li>
    <li style={{ display: 'flex', alignItems: 'center' }}>
      <IoIosCheckmarkCircle style={{ color: 'yellow', marginRight: '8px' }} />
      <span style={{ marginTop: '5px' }}>Minor Revisions</span>
    </li>
  </ul>
</div>




        <form className="pt-10 sm:mx-auto sm:w-[30rem] md:w-[35rem]">
          <Fade bottom distance={"4rem"}>
            <div className="relative">
            </div>

            <div className="relative mt-14">

            </div>

            <div className="relative mt-14">
            </div>
          </Fade>

          {mailerResponse !== "not initiated" &&
            (mailerResponse === "success" ? (
              <div className="hidden">{success()}</div>
            ) : (
              <div className="hidden">{error()}</div>
            ))}
        </form>
        <div className="mt-9 mx-auto link">
          <button
            className={styles.button}
            ref={buttonEl}
            disabled={
              formData.name === "" ||
              formData.email === "" ||
              formData.message === ""
                ? true
                : false
            }
            onClick={handleSubmit}
          >
            <span className={styles.default}>
              <a href="https://discord.com/users/989714259485286441">DISCORD</a></span>
            <svg className={styles.trails} viewBox="0 0 33 64">
              <path d="M26,4 C28,13.3333333 29,22.6666667 29,32 C29,41.3333333 28,50.6666667 26,60"></path>
              <path d="M6,4 C8,13.3333333 9,22.6666667 9,32 C9,41.3333333 8,50.6666667 6,60"></path>
            </svg>
            <div className={styles.plane}>
              <div className={styles.left}></div>
              <div className={styles.right}></div>
            </div>
          </button>
        </div>
      </div>
    </section>
  );
};

export default Contact;
