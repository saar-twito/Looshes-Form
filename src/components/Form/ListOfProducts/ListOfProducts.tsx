import FormControl from 'common/components/FormControl/FormControl';
import UseWindowSize from 'common/hooks/UseWindowsSize';
import { IFormUtils, FormValues } from 'common/interface';
import { useEffect } from 'react';
import { Control, useFieldArray } from 'react-hook-form';
import { RiDeleteBinLine } from 'react-icons/ri';
import './ListOfProducts.scss'


interface IListOfProducts extends IFormUtils {
  control: Control<FormValues, any>
}


const ListOfProducts = ({ control, register, errors }: IListOfProducts) => {
  const [, screenWidth] = UseWindowSize();

  useEffect(() => addProduct(), [])



  const { fields, prepend, remove } = useFieldArray({
    control, // control props comes from useForm (optional: if you are using FormContext)
    name: "products", // The name of the array
  });


  const addProduct = () => {
    prepend({
      itemName: "",
      color: "",
      amount: "",
      size: "",
      kind: ""
    })
  }

  const removeProduct = (index: number) => remove(index)

  return (
    <>
      {screenWidth < 500 ? <>
        <h3>רשימת מוצרים</h3>
        <div className="description-of-the-request-container white-container">

          {fields.map((field, index) => (
            <>
              {/* SMALL SCREENS */}
              <div key={field.id} className="products-list-for-small-screens">

                <FormControl
                  htmlFor='itemName'
                  label='מוצר'
                  register={register}
                  registerName={`products.${index}.itemName`}
                  errorMessage={errors?.products && errors?.products[index]?.itemName?.message} />

                <FormControl
                  htmlFor='color'
                  label='צבע'
                  register={register}
                  registerName={`products.${index}.color`}
                  errorMessage={errors?.products && errors?.products[index]?.color?.message} />

                <FormControl
                  htmlFor='size'
                  label='מידה'
                  register={register}
                  registerName={`products.${index}.size`}
                  errorMessage={errors?.products && errors?.products[index]?.size?.message} />

                <div className="form-control">
                  <label htmlFor="kind">סוג</label>
                  <select id="kind" {...register(`products.${index}.kind`)}>
                    <option value="קרטונים">קרטונים</option>
                    <option value="גלילים">גלילים</option>
                  </select>
                </div>

                <FormControl
                  htmlFor='amount'
                  label='כמות'
                  register={register}
                  registerName={`products.${index}.amount`}
                  errorMessage={errors?.products && errors?.products[index]?.amount?.message} />

                <button className="remove-trash"><RiDeleteBinLine onClick={() => removeProduct(index)} className='remove-trash-icon' /></button>
              </div>
            </>
          ))}
          <button type="button" className="add-product" onClick={() => addProduct()}>הוסף מוצר</button>
        </div>

      </> : <>
        <h3>רשימת מוצרים</h3>
        <div className="white-container">
          <table>
            <thead>
              <tr>
                <th>כמות</th>
                <th>סוג</th>
                <th>מידה</th>
                <th>צבע</th>
                <th>מוצר</th>
              </tr>
            </thead>

            <tbody>
              {fields.map((field, index) => (
                <tr key={field.id}>
                  <td>
                    <input type="number" {...register(`products.${index}.amount`)} />
                    <p className="error">{errors?.products && errors?.products[index]?.amount?.message}</p>
                  </td>
                  <td><textarea {...register(`products.${index}.size`)} /></td>
                  <td><textarea {...register(`products.${index}.color`)} /></td>
                  <td><textarea {...register(`products.${index}.itemName`)} /></td>
                  <td>
                    <select id="kind" {...register(`products.${index}.kind`)}>
                      <option value="קרטונים">קרטונים</option>
                      <option value="גלילים">גלילים</option>
                    </select>
                  </td>

                  <td className="remove-trash"><RiDeleteBinLine onClick={() => removeProduct(index)} className='remove-trash-icon' /></td>
                </tr>
              ))}
            </tbody>

          </table>
          <button type="button" className="add-product" onClick={() => addProduct()}>הוסף מוצר</button>
        </div>
      </>}
    </>
  )
}

export default ListOfProducts