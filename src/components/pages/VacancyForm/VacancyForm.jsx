import { useState, useEffect } from "react";
import { Formik, Form } from "formik";
import * as yup from "yup";
import { getData, postData, updateData } from "../../../services/ApiService";
import { useParams, useNavigate } from "react-router-dom";

import FormInput from "../../FormInput/FormInput";
import FormRadio from "../../FormRadio/FormRadio";
import FormSelect from "../../FormSelect/FormSelect";
import FormTextArea from "../../FormTextArea/FormTextArea";

import "./VacancyForm.scss";

const VacancyForm = () => {
  const initialValues = {
    jobTitle: "",
    vacancyTitle: "",
    department: "",
    openingDate: "",
    closingDate: "",
    gender: "",
    education: "",
    salaryType: "",
    salaryFrom: "",
    salaryTo: "",
    region: "",
    address: "",
    metro: "",
    experience: "",
    workSchedule: "",
    employmentType: "",
    responsibilities: "",
    wishes: "",
    advantages: "",
    offer: "",
    dateNow: new Date().toLocaleDateString("ru-RU"),
  };
  const [values, setValues] = useState({ ...initialValues });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const isNew = !id;

  useEffect(() => {
    if (!isNew) {
      setLoading(true);
      getData(id)
        .then((data) => {
          setValues((prev) => ({ ...prev, ...data }));
        })
        .catch((error) => {
          setError(error);
          setValues({ ...initialValues });
        })
        .finally(() => setLoading(false));
    }
  }, [id]);

  const handleReset = () => {
    setValues({ ...initialValues });
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  };

  return (
    <Formik
      enableReinitialize={true}
      initialValues={{
        ...values,
      }}
      validationSchema={yup.object({
        jobTitle: yup.string().nullable(),
        vacancyTitle: yup.string().required("Укажите наименование"),
        department: yup.string().required("Укажите отдел"),
        openingDate: yup.date().required("Укажите дату открытия"),
        closingDate: yup
          .date()
          .required("Укажите дату закрытия")
          .min(yup.ref("openingDate"), "Дата закрытия раньше даты открытия"),
        gender: yup.string().required("Выберите пол"),
        education: yup.string().required("Укажите образование"),
        salaryType: yup.string().required("Укажите тип зарплаты"),
        salaryFrom: yup.number().min(0, "Отрицательное значение").nullable(),
        salaryTo: yup
          .number()
          .min(yup.ref("salaryFrom"), "Значение меньше минимального")
          .nullable(),
        region: yup.string().required("Укажите регион"),
        address: yup
          .string()
          .required("Введите полный адрес. Например, Походный проезд, 3с1"),
        metro: yup.string().nullable(),
        experience: yup.string().required("Укажите опыт"),
        workSchedule: yup.string().required("Укажите график работы"),
        employmentType: yup.string().required("Выберите тип занятости"),
      })}
      onSubmit={(values) => {
        if (isNew) {
          postData(values);
          navigate("/");
        } else {
          updateData(id, values);
        }
      }}
    >
      <div className="container">
        <Form className="form">
          <h1 className="title">
            Форма {isNew ? "размещения" : "редактирования"} <span>заявки</span>
          </h1>
          <div className="form__container">
            <div className="form__inner">
              <FormInput
                label="Наименование должности"
                id="jobTitle"
                name="jobTitle"
                type="text"
              />
              <FormInput
                label="Наименование вакансии"
                id="vacancyTitle"
                name="vacancyTitle"
                type="text"
                req
              />
              <FormInput
                label="Отдел"
                id="department"
                name="department"
                type="text"
                req
              />
            </div>
            <div className="form__inner">
              <FormInput
                label="Дата открытия"
                id="openingDate"
                name="openingDate"
                type="date"
                req
              />
              <FormInput
                label="Плановая дата закрытия закрытия"
                id="closingDate"
                name="closingDate"
                type="date"
                req
              />
            </div>
            <div className="form__inner form__inner--gap">
              <FormRadio
                name="gender"
                label="Пол"
                options={[
                  { label: "Мужской", value: "мужской" },
                  { label: "Женский", value: "женский" },
                ]}
                req
              />
              <FormSelect
                label="Образование"
                id="education"
                name="education"
                placeholder="Выберите"
                options={[
                  { label: "Высшее", value: "Высшее" },
                  { label: "Среднее", value: "Среднее" },
                ]}
                req
              />
            </div>
          </div>
          <div className="form__container">
            <div className="form__inner">
              <FormRadio
                name="salaryType"
                label="Зарплата"
                options={[
                  { label: "На руки", value: "на руки" },
                  { label: "До вычета налогов", value: "до вычета налогов" },
                ]}
                req
                row
              />
            </div>
            <div className="form__inner">
              <FormInput
                label="От"
                id="salaryFrom"
                name="salaryFrom"
                type="number"
                row
              />
              <FormInput
                label="До"
                id="salaryTo"
                name="salaryTo"
                type="number"
                row
              />
            </div>
            <div className="form__inner">
              <FormInput
                label="Регион"
                id="region"
                name="region"
                type="text"
                req
              />
              <FormInput
                label="Адрес"
                id="address"
                name="address"
                type="text"
                req
              />
              <FormInput
                label="Станция метро, МЦД"
                id="metro"
                name="metro"
                type="text"
              />
            </div>
            <div className="form__inner">
              <FormInput
                label="Опыт работы"
                id="experience"
                name="experience"
                type="text"
                req
              />
              <FormSelect
                label="График работы"
                id="workSchedule"
                name="workSchedule"
                options={[
                  { label: "Полный день", value: "fullday" },
                  { label: "Сменный 5/2", value: "5/2" },
                  { label: "Сменный 2/2", value: "2/2" },
                ]}
                req
              />
              <FormRadio
                label="Тип занятости"
                id="employmentType"
                name="employmentType"
                options={[
                  { label: "Полная занятость", value: "full-employment" },
                  { label: "Частичная занятость", value: "part-time" },
                  { label: "Стажировка", value: "internship" },
                ]}
                req
              />
            </div>
          </div>
          <div className="form__container">
            <div className="form__inner form__inner--col">
              <FormTextArea
                label="Функциональный обязанности"
                placeholder="Какую работу будет выполнять сотрудник"
                id="responsibilities"
                name="responsibilities"
              />
            </div>
            <div className="form__inner form__inner--col">
              <FormTextArea
                label="Пожелания к кандидату"
                placeholder="Ключевые навыки, достижения"
                id="wishes"
                name="wishes"
              />
            </div>
            <div className="form__inner form__inner--col">
              <FormTextArea
                label="Преимуществом будет"
                placeholder="Дополнительные специальные навыки"
                id="advantages"
                name="advantages"
              />
            </div>
            <div className="form__inner form__inner--col">
              <FormTextArea label="Мы предлагаем" id="offer" name="offer" />
            </div>
          </div>
          <div className="form__buttons">
            <button type="submit" className="form__btn btn">
              Отправить
            </button>
            <button
              type="button"
              className="form__btn btn btn--reverse"
              onClick={handleReset}
            >
              Сбросить
            </button>
          </div>
        </Form>
      </div>
    </Formik>
  );
};

export default VacancyForm;
