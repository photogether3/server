export type OnlyProps<T> = {
    [K in keyof T as T[K] extends Function ? never : K]: T[K]
};

export class OrmModel {

    readonly createdAt: Date;
    readonly updatedAt: Date;
    readonly deletedAt: Date;

    /**
     * @description
     * 인스턴스의 모든 속성 중 함수가 아닌 값만 추출하여 순수 객체로 반환합니다.
     * Firestore에 저장 가능한 형태의 plain object를 얻기 위해 사용합니다.
     */
    toPlainObject(): OnlyProps<this> {
        const data = {} as OnlyProps<this>;
        for (const key of Object.keys(this)) {
            const value = (this as any)[key];
            if (typeof value !== 'function') {
                data[key as keyof OnlyProps<this>] = value;
            }
        }
        return data;
    }
}
