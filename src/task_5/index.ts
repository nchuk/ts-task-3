/**
 * Задание 5 - Власть банков
 * В этой задаче вам нужно реализовать класс контроллер
 * 1. registerVault(): ISecureVaultRequisites - регистрирует хранилище в банке
 * 2. proceedContract(IContract): void - проводит договор между счетами
 * 3. Класс контроллера должен быть реализацией паттерна Singleton
 *
 * Хранилища должны быть сохранены в массив vaultStore: Vault[]
 */
import { IContract } from "../task_4";
import { ISecureVaultRequisites, Vault } from "../task_3";

export class BankController{

    private static instance: BankController;
    private vaultStore: Vault[];

    public static getInstance(): BankController{
        if(!this.instance){
            this.instance = new BankController();
        }

        return this.instance;
    }

    public registerVault(): ISecureVaultRequisites{
        const newVault = new Vault();
        this.vaultStore.push(newVault);

        return newVault;

    }

    public proceedContract(contract: IContract) {

        const sender = this.vaultStore.find((element) => element.id === contract.sender.id);
        const receiver = this.vaultStore.find((element) => element.id === contract.receiver.id);
        if((sender && receiver) !== undefined){
            contract.signAndTransfer()
            try{
                sender.transfer(contract.value,receiver);
                contract.closeTransfer();

            } catch(e) {
                contract.rejectTransfer();
            }
        } else {
            contract.rejectTransfer();
            throw new Error("Что то пошло не так перепроверьте данные");
        }

        
    }
}

