package com.crisalis.orderManagerSpring.model;


import lombok.Getter;
import lombok.Setter;
import javax.persistence.*;

@Getter
@Setter
@Entity
@Table(name = "users", uniqueConstraints = @UniqueConstraint(columnNames = "email"))
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "email")
    private String email;

    @Column(name = "userName")
    private String userName;

    @Column(name = "password")
    private String password;

    // Agregar relacion
    @ManyToOne
    @JoinColumn(name = "id_roles")
    // @Column(name = "id_roles")
    private Role role;

    public User() {
    }

    public User(int id, String email, String userName, String password) {
        super();
        this.id = id;
        this.email = email;
        this.userName = userName;
        this.password = password;
        this.role = new Role();
    }

}
