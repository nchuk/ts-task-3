/* eslint-disable no-mixed-spaces-and-tabs */
/** Задача 3 - Моё хранилище
 *	Напишите класс хранилища(Vault)
 *	Из хранилища можно снимать валюту с помощью withdraw(Currency)
 *	В хранилище можно вкладывать валюту через deposit(Currency)
 *	Из хранлилища, можно переводить валюту через transfer(Currency, Vault)
*/
import { Currency } from "../task_1";

export class Vault implements ISecureVaultRequisites{
	public id: number;
	public store: Set<Currency> = new Set<Currency>();

	public withdraw(currency: Currency) {
		this.store.forEach((value) => {
		  if (value.name === currency.name && value.value >= currency.value) {
			value.value -= currency.value;
		  } else {
			throw new Error("Ищи другую работу, а то зарплата слишком маленькая");
		  }
		});
	  }

	public deposit(currency: Currency){
		let thereIsCurrency = false;

		this.store.forEach((value)=>{
			if(value.name === currency.name){
				thereIsCurrency = true;
				value.value+=currency.value;
			}
		})

		if(!thereIsCurrency){
			this.store.add(currency);
		}
	}

	public transfer (currency: Currency, vault: Vault){
		this.withdraw(currency);
		vault.deposit(currency);
	}
}


export interface ISecureVaultRequisites{
	id: number;
	withdraw: (currency: Currency) => void;
	deposit: (currency: Currency) => void;
}
