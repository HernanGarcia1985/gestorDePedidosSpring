package com.crisalis.orderManagerSpring.model;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Getter
@Setter
@Entity
@Table(name = "roles")

public class Role {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "name")
    private String name;

    @OneToMany(mappedBy="roles", cascade = CascadeType.ALL, orphanRemoval = false)
    public String getName() {
        return name;
    }

    public Role(int id, String name) {
        super();
        this.id = id;
        this.name = name;
    }

    public Role() {
        super();
        this.id = 1;
        this.name = "Common User";
    }
}
